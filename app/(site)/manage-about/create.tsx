"use client";

import React, { useState } from "react";
import { useCreateAboutProfile, AboutProfilePayload } from "@/hooks/use-about";
import { AboutPublicPreview } from "./preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  ArrowLeft,
  Upload,
  Globe,
  Mail,
  Calendar,
  Briefcase,
  GraduationCap,
  Loader2,
  FileText,
  User,
  Cpu,
  Eye,
  Settings2,
} from "lucide-react";

const DEFAULT_SKILL_CATEGORIES = [
  "Programming Languages",
  "Backend Development",
  "Frontend Development",
  "Databases & Dev Tools",
  "DevOps & Tools",
];

const Github = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);


interface CreateProfileFormProps {
  onBack?: () => void;
  onSuccess: () => void;
}

export function CreateProfileForm({ onBack, onSuccess }: CreateProfileFormProps) {
  const createProfileMutation = useCreateAboutProfile();
  
  // General Info
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [timezone, setTimezone] = useState("Asia/Manila");
  const [isActive, setIsActive] = useState(true);
  
  // Socials
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [email, setEmail] = useState("");
  const [scheduleCallUrl, setScheduleCallUrl] = useState("");

  // Avatar / Logo image
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Dynamic Work Experience List
  const [workExperiences, setWorkExperiences] = useState<{
    company: string;
    role: string;
    date: string;
    bullets: string[];
    order: number;
    newBullet: string;
  }[]>([]);

  // Dynamic Studies List
  const [studies, setStudies] = useState<{
    school: string;
    degree: string;
    order: number;
  }[]>([]);

  // Dynamic Technical Skills List
  const [technicalSkills, setTechnicalSkills] = useState<{
    name: string;
    url: string;
    link: string;
    category: string;
    order: number;
    uploading?: boolean;
  }[]>([]);
  const [skillCategories, setSkillCategories] = useState<string[]>(DEFAULT_SKILL_CATEGORIES);
  const [newSkillCategory, setNewSkillCategory] = useState("");
  const [selectedCategoryForNewSkill, setSelectedCategoryForNewSkill] = useState(DEFAULT_SKILL_CATEGORIES[0]);
  const [activeTab, setActiveTab] = useState("general");
  const [showPreviewOnMobile, setShowPreviewOnMobile] = useState(false);

  const uploadImageViaApi = async (file: File, folder: string): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const res = await fetch("/api/site/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || "Failed to upload image");
    }

    return data.publicUrl as string;
  };

  // Supabase File Upload Handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;
      const publicUrl = await uploadImageViaApi(file, "about");

      setAvatarUrl(publicUrl);
      toast.success("Image uploaded successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  // Work Experience Operations
  const addWorkExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      {
        company: "",
        role: "",
        date: "",
        bullets: [],
        order: workExperiences.length,
        newBullet: "",
      },
    ]);
  };

  const removeWorkExperience = (index: number) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== index));
  };

  const updateWorkExperience = (index: number, key: string, value: any) => {
    const updated = [...workExperiences];
    updated[index] = { ...updated[index], [key]: value };
    setWorkExperiences(updated);
  };

  const addBulletPoint = (index: number) => {
    const exp = workExperiences[index];
    if (!exp.newBullet.trim()) return;

    const updated = [...workExperiences];
    updated[index] = {
      ...exp,
      bullets: [...exp.bullets, exp.newBullet.trim()],
      newBullet: "",
    };
    setWorkExperiences(updated);
  };

  const removeBulletPoint = (expIndex: number, bulletIndex: number) => {
    const exp = workExperiences[expIndex];
    const updated = [...workExperiences];
    updated[expIndex] = {
      ...exp,
      bullets: exp.bullets.filter((_, i) => i !== bulletIndex),
    };
    setWorkExperiences(updated);
  };

  // Studies Operations
  const addStudy = () => {
    setStudies([
      ...studies,
      {
        school: "",
        degree: "",
        order: studies.length,
      },
    ]);
  };

  const removeStudy = (index: number) => {
    setStudies(studies.filter((_, i) => i !== index));
  };

  const updateStudy = (index: number, key: string, value: any) => {
    const updated = [...studies];
    updated[index] = { ...updated[index], [key]: value };
    setStudies(updated);
  };

  // Technical Skills Operations
  const addSkillCategory = () => {
    const normalized = newSkillCategory.trim();
    if (!normalized) return;

    const exists = skillCategories.some(
      (category) => category.toLowerCase() === normalized.toLowerCase()
    );

    if (exists) {
      toast.info("Category already exists");
      return;
    }

    setSkillCategories((prev) => [...prev, normalized]);
    setSelectedCategoryForNewSkill(normalized);
    setNewSkillCategory("");
    toast.success("Category added");
  };

  const addTechnicalSkill = () => {
    setTechnicalSkills([
      ...technicalSkills,
      {
        name: "",
        url: "",
        link: "",
        category: selectedCategoryForNewSkill || skillCategories[0] || "General",
        order: technicalSkills.length,
      },
    ]);
  };

  const removeTechnicalSkill = (index: number) => {
    setTechnicalSkills(technicalSkills.filter((_, i) => i !== index));
  };

  const updateTechnicalSkill = (index: number, key: string, value: any) => {
    const updated = [...technicalSkills];
    updated[index] = { ...updated[index], [key]: value };
    setTechnicalSkills(updated);
  };

  const handleSkillLogoUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      const updated = [...technicalSkills];
      updated[index] = { ...updated[index], uploading: true };
      setTechnicalSkills(updated);

      const publicUrl = await uploadImageViaApi(file, "about/skills");

      const successUpdated = [...technicalSkills];
      successUpdated[index] = { 
        ...successUpdated[index], 
        url: publicUrl, 
        uploading: false 
      };
      setTechnicalSkills(successUpdated);
      toast.success("Skill logo uploaded successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to upload logo");
      const errorUpdated = [...technicalSkills];
      errorUpdated[index] = { ...errorUpdated[index], uploading: false };
      setTechnicalSkills(errorUpdated);
    }
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name is required");
    if (!title.trim()) return toast.error("Title is required");
    if (!bio.trim()) return toast.error("Bio is required");

    const payload: AboutProfilePayload = {
      name,
      title,
      avatarUrl,
      timezone,
      isActive,
      githubUrl: githubUrl || null,
      linkedinUrl: linkedinUrl || null,
      email: email || null,
      scheduleCallUrl: scheduleCallUrl || null,
      bio,
      workExperiences: workExperiences.map((exp) => ({
        company: exp.company,
        role: exp.role,
        date: exp.date,
        bullets: exp.bullets,
        order: exp.order,
      })),
      studies: studies.map((st) => ({
        school: st.school,
        degree: st.degree,
        order: st.order,
      })),
      technicalSkills: technicalSkills.map((sk) => ({
        name: sk.name,
        url: sk.url,
        link: sk.link || null,
        category: sk.category,
        order: sk.order,
      })),
    };

    createProfileMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Profile created successfully!");
        onSuccess();
      },
      onError: (err) => {
        toast.error(err.message || "Failed to create profile");
      },
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Universal Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background/95 backdrop-blur shrink-0 z-50">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="font-bold text-lg leading-tight">Create Profile</h1>
            <p className="text-[10px] text-muted-foreground hidden md:block">Draft your public portfolio presence</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowPreviewOnMobile(!showPreviewOnMobile)}
            className="xl:hidden rounded-lg gap-2 border-indigo-500/30 text-indigo-400"
          >
            {showPreviewOnMobile ? <Settings2 className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showPreviewOnMobile ? "Editor" : "Preview"}
          </Button>

          <Button
            onClick={handleSubmit}
            className="rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold h-9 px-4 shadow-[0_4px_12px_rgba(99,102,241,0.2)]"
            disabled={createProfileMutation.isPending}
          >
            {createProfileMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <FileText className="h-4 w-4 mr-2" />}
            Save Profile
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col xl:flex-row overflow-hidden relative">
        {/* 2. Editor Sidebar */}
        <div className={`
          ${showPreviewOnMobile ? 'hidden' : 'flex'} 
          xl:flex flex-col w-full xl:w-120 bg-card/10 border-r border-border/50 h-full overflow-hidden
        `}>
          {/* Form Sections Tabs */}
          <Tabs defaultValue="general" className="flex-1 flex flex-col overflow-hidden" onValueChange={setActiveTab}>
            <div className="px-4 pt-4 shrink-0">
              <TabsList className="grid grid-cols-4 w-full bg-secondary/20 p-1 rounded-xl">
              <TabsTrigger value="general" className="rounded-lg text-[11px] py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                General
              </TabsTrigger>
              <TabsTrigger value="social" className="rounded-lg text-[11px] py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Social
              </TabsTrigger>
              <TabsTrigger value="work" className="rounded-lg text-[11px] py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Work
              </TabsTrigger>
              <TabsTrigger value="more" className="rounded-lg text-[11px] py-1.5 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                Skills
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 p-6">
            <form onSubmit={handleSubmit} className="space-y-8 pb-20">
              
              <TabsContent value="general" className="mt-0 space-y-8 animate-in fade-in slide-in-from-left-2 duration-300">
                {/* Profile Photo */}
                <div className="space-y-4">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Identity</Label>
                  <div className="flex items-center gap-6 p-4 rounded-2xl border border-border/50 bg-secondary/5">
                    <div className="relative group shrink-0">
                      {avatarUrl ? (
                         <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500/30 shadow-inner">
                            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                            <button 
                              type="button" 
                              onClick={() => setAvatarUrl(null)}
                              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-100 transition-opacity rounded-full text-[10px] font-bold"
                            >
                              REMOVE
                            </button>
                         </div>
                      ) : (
                        <label className="w-24 h-24 rounded-full border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-500/5 hover:border-indigo-500/50 transition-all bg-background/50">
                          {uploading ? <Loader2 className="h-6 w-6 animate-spin text-indigo-500" /> : <Upload className="h-6 w-6 text-muted-foreground" />}
                          <span className="text-[10px] mt-1 font-medium text-muted-foreground">UPLOAD</span>
                          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
                        </label>
                      )}
                    </div>
                    <div className="flex-1 space-y-3">
                       <div className="space-y-1.5">
                         <Label htmlFor="name" className="text-[11px] font-semibold">Full Name</Label>
                         <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="h-9 px-3 bg-background/50 rounded-lg text-sm" placeholder="Karl N. Buensalida" required />
                       </div>
                       <div className="space-y-1.5">
                         <Label htmlFor="title" className="text-[11px] font-semibold">Job Title</Label>
                         <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="h-9 px-3 bg-background/50 rounded-lg text-sm" placeholder="Software Engineer" required />
                       </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Bio & Presence</Label>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="bio" className="text-[11px] font-semibold">Biography</Label>
                      <textarea id="bio" rows={6} value={bio} onChange={(e) => setBio(e.target.value)} className="flex w-full rounded-xl border border-input bg-background/50 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 transition-all" placeholder="Tell your story..." required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="timezone" className="text-[11px] font-semibold flex items-center gap-1.5"><Globe className="h-3 w-3" /> Preferred Timezone</Label>
                      <Input id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)} className="h-9 bg-background/50 rounded-lg text-sm" placeholder="Asia/Manila" />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="social" className="mt-0 space-y-6 animate-in fade-in slide-in-from-left-2 duration-300">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Links & Contact</Label>
                <div className="p-4 rounded-2xl border border-border/50 bg-secondary/5 space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-semibold flex items-center gap-2"><Github className="h-3.5 w-3.5" /> GitHub</Label>
                    <Input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="h-9 bg-background/50 rounded-lg text-xs" placeholder="https://github.com/..." />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-semibold flex items-center gap-2"><Linkedin className="h-3.5 w-3.5" /> LinkedIn</Label>
                    <Input value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className="h-9 bg-background/50 rounded-lg text-xs" placeholder="https://linkedin.com/..." />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-semibold flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> Email</Label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-9 bg-background/50 rounded-lg text-xs" placeholder="hello@example.com" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-semibold flex items-center gap-2"><Calendar className="h-3.5 w-3.5 text-blue-400" /> Booking URL</Label>
                    <Input value={scheduleCallUrl} onChange={(e) => setScheduleCallUrl(e.target.value)} className="h-9 bg-background/50 rounded-lg text-xs border-blue-500/20" placeholder="https://cal.com/..." />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="work" className="mt-0 space-y-6 animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Experience History</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addWorkExperience} className="h-7 text-[10px] rounded-lg gap-1 border-indigo-500/30 text-indigo-400">
                    <Plus className="h-3 w-3" /> ADD NEW
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {workExperiences.map((exp, index) => (
                    <div key={index} className="p-4 rounded-2xl border border-border bg-card/50 relative group">
                      <button type="button" onClick={() => removeWorkExperience(index)} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all text-red-500 hover:text-red-400">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <div className="space-y-3">
                        <Input value={exp.company} onChange={(e) => updateWorkExperience(index, "company", e.target.value)} className="h-8 text-sm font-bold bg-transparent border-none p-0 focus-visible:ring-0" placeholder="Organization" />
                        <Input value={exp.role} onChange={(e) => updateWorkExperience(index, "role", e.target.value)} className="h-7 text-[11px] bg-secondary/20 border-none rounded-md px-2" placeholder="Position" />
                        <Input value={exp.date} onChange={(e) => updateWorkExperience(index, "date", e.target.value)} className="h-7 text-[10px] bg-secondary/10 border-none rounded-md px-2 text-muted-foreground" placeholder="Duration (e.g. 2021 - Present)" />
                        
                        <div className="space-y-2 pt-2 border-t border-border/40">
                          {exp.bullets.map((bullet, bi) => (
                            <div key={bi} className="flex gap-2 items-start text-[11px] group/item">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-indigo-500 shrink-0" />
                              <span className="flex-1 text-muted-foreground leading-relaxed">{bullet}</span>
                              <button type="button" onClick={() => removeBulletPoint(index, bi)} className="opacity-0 group-hover/item:opacity-100 text-red-400"><Trash2 className="h-3 w-3" /></button>
                            </div>
                          ))}
                          <div className="flex gap-2 mt-2">
                            <Input 
                              value={exp.newBullet} 
                              onChange={(e) => updateWorkExperience(index, "newBullet", e.target.value)} 
                              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBulletPoint(index))}
                              className="h-7 text-[10px] bg-secondary/10" 
                              placeholder="Add achievement..." 
                            />
                            <Button type="button" size="sm" variant="ghost" onClick={() => addBulletPoint(index)} className="h-7 w-7 p-0"><Plus className="h-3 w-3" /></Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="more" className="mt-0 space-y-6 animate-in fade-in slide-in-from-left-2 duration-300">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Education</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addStudy} className="h-7 text-[10px] rounded-lg gap-1 border-indigo-500/30 text-indigo-400">
                      <Plus className="h-3 w-3" /> ADD
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {studies.map((st, i) => (
                      <div key={i} className="p-3 rounded-xl border border-border/50 bg-secondary/5 relative group">
                        <button type="button" onClick={() => removeStudy(i)} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500"><Trash2 className="h-3 w-3" /></button>
                        <Input value={st.school} onChange={(e) => updateStudy(i, "school", e.target.value)} className="h-7 text-xs font-semibold bg-transparent border-none p-0 focus-visible:ring-0" placeholder="School/University" />
                        <Input value={st.degree} onChange={(e) => updateStudy(i, "degree", e.target.value)} className="h-6 text-[10px] bg-transparent border-none p-0 focus-visible:ring-0 text-muted-foreground" placeholder="Degree/Cert" />
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border/40">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Skills Bar</Label>
                    <p className="mt-1 mb-3 text-[10px] text-muted-foreground">Step 1: Add category if needed. Step 2: Choose a category and click New Skill.</p>
                    <div className="mb-3 flex items-center gap-2">
                      <Input
                        value={newSkillCategory}
                        onChange={(e) => setNewSkillCategory(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkillCategory();
                          }
                        }}
                        className="h-8 text-[10px]"
                        placeholder="Add new category (e.g. Mobile Development)"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={addSkillCategory}
                        className="h-8 text-[10px] rounded-lg"
                      >
                        Add Category
                      </Button>
                    </div>
                    <div className="mb-3 flex items-center gap-2">
                      <select
                        value={selectedCategoryForNewSkill}
                        onChange={(e) => setSelectedCategoryForNewSkill(e.target.value)}
                        className="h-8 flex-1 rounded-md border border-input bg-background px-2 text-[10px]"
                      >
                        {skillCategories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <Button type="button" variant="outline" size="sm" onClick={addTechnicalSkill} className="h-8 text-[10px] rounded-lg gap-1 border-indigo-500/30 text-indigo-400">
                        <Plus className="h-3 w-3" /> NEW SKILL
                      </Button>
                    </div>
                    <div className="mb-3 flex flex-wrap gap-1">
                      {skillCategories.map((category) => (
                        <span
                          key={category}
                          className="rounded-full border border-border/60 px-2 py-0.5 text-[9px] text-muted-foreground"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {technicalSkills.map((sk, i) => (
                        <div key={i} className="p-2.5 rounded-xl border border-border/50 bg-background flex items-center gap-3 relative group">
                          <button type="button" onClick={() => removeTechnicalSkill(i)} className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 bg-red-500 text-white rounded-full p-0.5 shadow-sm"><Trash2 className="h-2.5 w-2.5" /></button>
                          <div className="h-8 w-8 rounded-lg bg-secondary/20 overflow-hidden shrink-0">
                            {sk.url ? <img src={sk.url} className="h-full w-full object-contain p-1" /> : (
                              <label className="h-full w-full flex items-center justify-center cursor-pointer hover:bg-indigo-500/10">
                                {sk.uploading ? <Loader2 className="h-3 w-3 animate-spin text-indigo-500" /> : <Upload className="h-3 w-3 text-muted-foreground" />}
                                <input type="file" accept="image/*" onChange={(e) => handleSkillLogoUpload(i, e)} className="hidden" />
                              </label>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <Input value={sk.name} onChange={(e) => updateTechnicalSkill(i, "name", e.target.value)} className="h-5 text-[10px] font-bold bg-transparent border-none p-0 focus-visible:ring-0" placeholder="Name" />
                            <select
                              value={sk.category}
                              onChange={(e) => updateTechnicalSkill(i, "category", e.target.value)}
                              className="h-6 w-full rounded border border-input/40 bg-background/60 px-1 text-[9px]"
                            >
                              {skillCategories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </form>
          </div>
        </Tabs>
      </div>

      {/* 3. Preview Area */}
      <div className={`
        ${showPreviewOnMobile ? 'flex' : 'hidden'} 
        xl:flex flex-1 flex-col h-full relative overflow-hidden bg-background
      `}>
        <div className="flex-1 overflow-y-auto p-4 xl:p-8">
          <div className="max-w-5xl mx-auto">
            <AboutPublicPreview
              name={name}
              title={title}
              bio={bio}
              timezone={timezone}
              avatarUrl={avatarUrl}
              githubUrl={githubUrl}
              linkedinUrl={linkedinUrl}
              email={email}
              workExperiences={workExperiences}
              studies={studies}
              technicalSkills={technicalSkills}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

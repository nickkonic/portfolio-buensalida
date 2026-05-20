import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface WorkExperienceItem {
  id?: string;
  company: string;
  role: string;
  date: string;
  bullets: string[];
  order: number;
}

export interface StudyItem {
  id?: string;
  school: string;
  degree: string;
  order: number;
}

export interface TechnicalSkillItem {
  id?: string;
  name: string;
  url: string;
  link?: string | null;
  category: string;
  order: number;
}

export interface AboutProfile {
  id: string;
  name: string;
  title: string;
  avatarUrl: string | null;
  timezone: string;
  scheduleCallUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  email: string | null;
  bio: string;
  isActive: boolean;
  workExperiences: WorkExperienceItem[];
  studies: StudyItem[];
  technicalSkills: TechnicalSkillItem[];
  createdAt?: string;
}

export interface AboutListProfile {
  id: string;
  name: string;
  title: string;
  avatar_url: string | null;
  timezone: string;
  is_active: boolean;
  created_at: string;
}

export const aboutKeys = {
  all: ["about"] as const,
  lists: () => [...aboutKeys.all, "list"] as const,
  details: () => [...aboutKeys.all, "detail"] as const,
  detail: (id: string) => [...aboutKeys.details(), id] as const,
  active: () => [...aboutKeys.all, "active"] as const,
};

// ─── Query Hooks ────────────────────────────────────────────────────────────

/**
 * Hook to fetch all about profiles (Admin only)
 */
export function useAboutProfiles() {
  return useQuery<AboutListProfile[]>({
    queryKey: aboutKeys.lists(),
    queryFn: async () => {
      const res = await fetch("/api/site/about");
      if (!res.ok) throw new Error("Failed to fetch profiles");
      const data = await res.json();
      return data.profiles || [];
    },
  });
}

/**
 * Hook to fetch details for a single profile (Admin only)
 */
export function useAboutProfile(id: string | null) {
  return useQuery<AboutProfile | null>({
    queryKey: aboutKeys.detail(id || ""),
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`/api/site/about?id=${id}`);
      if (!res.ok) throw new Error("Failed to fetch profile details");
      const data = await res.json();
      return data.profile || null;
    },
    enabled: !!id,
  });
}

/**
 * Hook to fetch the currently active/default profile (Public)
 */
export function useActiveAboutProfile() {
  return useQuery<AboutProfile | null>({
    queryKey: aboutKeys.active(),
    queryFn: async () => {
      const res = await fetch("/api/home/about");
      if (!res.ok) throw new Error("Failed to fetch active profile");
      const data = await res.json();
      return data.profile || null;
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// ─── Mutation Hooks ─────────────────────────────────────────────────────────

export interface AboutProfilePayload {
  name: string;
  title: string;
  avatarUrl?: string | null;
  timezone: string;
  scheduleCallUrl?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  email?: string | null;
  bio: string;
  isActive: boolean;
  workExperiences: Omit<WorkExperienceItem, "id">[];
  studies: Omit<StudyItem, "id">[];
  technicalSkills: Omit<TechnicalSkillItem, "id">[];
}

/**
 * Mutation to create a new profile
 */
export function useCreateAboutProfile() {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean; id: string }, Error, AboutProfilePayload>({
    mutationFn: async (payload) => {
      const res = await fetch("/api/site/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create profile");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aboutKeys.all });
    },
  });
}

/**
 * Mutation to update an existing profile
 */
export function useUpdateAboutProfile(id: string) {
  const queryClient = useQueryClient();

  return useMutation<void, Error, AboutProfilePayload>({
    mutationFn: async (payload) => {
      const res = await fetch(`/api/site/about?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update profile");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aboutKeys.all });
    },
  });
}

/**
 * Mutation to delete a profile
 */
export function useDeleteAboutProfile() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const res = await fetch(`/api/site/about?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to delete profile");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: aboutKeys.all });
    },
  });
}

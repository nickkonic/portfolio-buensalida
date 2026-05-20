import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

export async function GET() {
  try {
    // 1. Fetch active profile
    let profiles = await query<{
      id: string;
      name: string;
      title: string;
      avatar_url: string | null;
      timezone: string;
      schedule_call_url: string | null;
      github_url: string | null;
      linkedin_url: string | null;
      email: string | null;
      bio: string;
      is_active: boolean;
    }>(
      `SELECT id, name, title, avatar_url, timezone, schedule_call_url, github_url, linkedin_url, email, bio, is_active
       FROM about_profiles
       WHERE is_active = true
       LIMIT 1`
    );

    // 2. If no active profile, fetch the latest one
    if (profiles.length === 0) {
      profiles = await query<{
        id: string;
        name: string;
        title: string;
        avatar_url: string | null;
        timezone: string;
        schedule_call_url: string | null;
        github_url: string | null;
        linkedin_url: string | null;
        email: string | null;
        bio: string;
        is_active: boolean;
      }>(
        `SELECT id, name, title, avatar_url, timezone, schedule_call_url, github_url, linkedin_url, email, bio, is_active
         FROM about_profiles
         ORDER BY created_at DESC
         LIMIT 1`
      );
    }

    const profile = profiles[0];
    if (!profile) {
      return NextResponse.json({ profile: null });
    }

    // 3. Fetch experiences and studies
    const workExperiences = await query<{
      id: string;
      company: string;
      role: string;
      date: string;
      bullets: string[];
      order: number;
    }>(
      `SELECT id, company, role, date, bullets, "order"
       FROM about_work_experiences
       WHERE about_id = $1
       ORDER BY "order" ASC`,
      [profile.id]
    );

    const studies = await query<{
      id: string;
      school: string;
      degree: string;
      order: number;
    }>(
      `SELECT id, school, degree, "order"
       FROM about_studies
       WHERE about_id = $1
       ORDER BY "order" ASC`,
      [profile.id]
    );

    const technicalSkills = await query<{
      id: string;
      name: string;
      url: string;
      link: string | null;
      category: string;
      order: number;
    }>(
      `SELECT id, name, url, link, category, "order"
       FROM about_technical_skills
       WHERE about_id = $1
       ORDER BY "order" ASC`,
      [profile.id]
    );

    return NextResponse.json({
      profile: {
        ...profile,
        avatarUrl: profile.avatar_url,
        scheduleCallUrl: profile.schedule_call_url,
        githubUrl: profile.github_url,
        linkedinUrl: profile.linkedin_url,
        isActive: profile.is_active,
        workExperiences,
        studies,
        technicalSkills,
      },
    });
  } catch (error) {
    console.error("Failed to fetch public about info:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/lib/db";
import { getSession } from "@/app/lib/auth/session";

// Types
interface WorkExperienceInput {
  company: string;
  role: string;
  date: string;
  bullets: string[];
  order: number;
}

interface StudyInput {
  school: string;
  degree: string;
  order: number;
}

interface TechnicalSkillInput {
  name: string;
  url: string;
  link?: string | null;
  category: string;
  order: number;
}

interface ProfileInput {
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
  workExperiences: WorkExperienceInput[];
  studies: StudyInput[];
  technicalSkills: TechnicalSkillInput[];
}

export async function GET(request: NextRequest) {
  // Check auth session
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    if (id) {
      // Get single profile details
      const profiles = await query<{
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
         WHERE id = $1
         LIMIT 1`,
        [id]
      );

      const profile = profiles[0];
      if (!profile) {
        return NextResponse.json({ error: "Profile not found" }, { status: 404 });
      }

      const workExperiences = await query(
        `SELECT company, role, date, bullets, "order"
         FROM about_work_experiences
         WHERE about_id = $1
         ORDER BY "order" ASC`,
        [id]
      );

      const studies = await query(
        `SELECT school, degree, "order"
         FROM about_studies
         WHERE about_id = $1
         ORDER BY "order" ASC`,
        [id]
      );

      const technicalSkills = await query(
        `SELECT name, url, link, category, "order"
         FROM about_technical_skills
         WHERE about_id = $1
         ORDER BY "order" ASC`,
        [id]
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
    } else {
      // Get all profiles for dashboard listing
      const profiles = await query(
        `SELECT id, name, title, avatar_url, timezone, is_active, created_at
         FROM about_profiles
         ORDER BY created_at DESC`
      );

      return NextResponse.json({ profiles });
    }
  } catch (error) {
    console.error("Admin GET error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Check auth session
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body: ProfileInput = await request.json();
    const {
      name,
      title,
      avatarUrl = null,
      timezone = "Asia/Manila",
      scheduleCallUrl = null,
      githubUrl = null,
      linkedinUrl = null,
      email = null,
      bio,
      isActive = false,
      workExperiences = [],
      studies = [],
      technicalSkills = [],
    } = body;

    if (!name || !title || !bio) {
      return NextResponse.json({ error: "Name, title, and bio are required fields" }, { status: 400 });
    }

    // 1. If active, deactivate other profiles
    if (isActive) {
      await query(`UPDATE about_profiles SET is_active = false`);
    }

    // 2. Insert new profile
    const profileResult = await query<{ id: string }>(
      `INSERT INTO about_profiles (id, name, title, avatar_url, timezone, schedule_call_url, github_url, linkedin_url, email, bio, is_active, created_at, updated_at)
       VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
       RETURNING id`,
      [name, title, avatarUrl, timezone, scheduleCallUrl, githubUrl, linkedinUrl, email, bio, isActive]
    );

    const aboutId = profileResult[0].id;

    // 3. Insert experiences
    for (const exp of workExperiences) {
      await query(
        `INSERT INTO about_work_experiences (id, about_id, company, role, date, bullets, "order", created_at, updated_at)
         VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, NOW(), NOW())`,
        [aboutId, exp.company, exp.role, exp.date, exp.bullets, exp.order]
      );
    }

    // 4. Insert studies
    for (const study of studies) {
      await query(
        `INSERT INTO about_studies (id, about_id, school, degree, "order", created_at, updated_at)
         VALUES (gen_random_uuid()::text, $1, $2, $3, $4, NOW(), NOW())`,
        [aboutId, study.school, study.degree, study.order]
      );
    }

    // 5. Insert technical skills
    for (const skill of technicalSkills) {
      await query(
        `INSERT INTO about_technical_skills (id, about_id, name, url, link, category, "order", created_at, updated_at)
         VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, NOW(), NOW())`,
        [aboutId, skill.name, skill.url, skill.link || null, skill.category, skill.order]
      );
    }

    return NextResponse.json({ success: true, id: aboutId });
  } catch (error) {
    console.error("Admin POST error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  // Check auth session
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const body: ProfileInput = await request.json();
    const {
      name,
      title,
      avatarUrl = null,
      timezone = "Asia/Manila",
      scheduleCallUrl = null,
      githubUrl = null,
      linkedinUrl = null,
      email = null,
      bio,
      isActive = false,
      workExperiences = [],
      studies = [],
      technicalSkills = [],
    } = body;

    if (!name || !title || !bio) {
      return NextResponse.json({ error: "Name, title, and bio are required fields" }, { status: 400 });
    }

    // 1. If active, deactivate other profiles
    if (isActive) {
      await query(`UPDATE about_profiles SET is_active = false`);
    }

    // 2. Update profile
    await query(
      `UPDATE about_profiles
       SET name = $1, title = $2, avatar_url = $3, timezone = $4, schedule_call_url = $5, github_url = $6, linkedin_url = $7, email = $8, bio = $9, is_active = $10, updated_at = NOW()
       WHERE id = $11`,
      [name, title, avatarUrl, timezone, scheduleCallUrl, githubUrl, linkedinUrl, email, bio, isActive, id]
    );

    // 3. Clear existing experiences, studies, and skills
    await query(`DELETE FROM about_work_experiences WHERE about_id = $1`, [id]);
    await query(`DELETE FROM about_studies WHERE about_id = $1`, [id]);
    await query(`DELETE FROM about_technical_skills WHERE about_id = $1`, [id]);

    // 4. Insert experiences
    for (const exp of workExperiences) {
      await query(
        `INSERT INTO about_work_experiences (id, about_id, company, role, date, bullets, "order", created_at, updated_at)
         VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, NOW(), NOW())`,
        [id, exp.company, exp.role, exp.date, exp.bullets, exp.order]
      );
    }

    // 5. Insert studies
    for (const study of studies) {
      await query(
        `INSERT INTO about_studies (id, about_id, school, degree, "order", created_at, updated_at)
         VALUES (gen_random_uuid()::text, $1, $2, $3, $4, NOW(), NOW())`,
        [id, study.school, study.degree, study.order]
      );
    }

    // 6. Insert technical skills
    for (const skill of technicalSkills) {
      await query(
        `INSERT INTO about_technical_skills (id, about_id, name, url, link, category, "order", created_at, updated_at)
         VALUES (gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, NOW(), NOW())`,
        [id, skill.name, skill.url, skill.link || null, skill.category, skill.order]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin PUT error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  // Check auth session
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    // Delete profile (work experiences & studies are deleted automatically due to cascade on_delete)
    await query(`DELETE FROM about_profiles WHERE id = $1`, [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin DELETE error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

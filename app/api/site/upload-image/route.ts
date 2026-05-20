import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSession } from "@/app/lib/auth/session";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SERVICE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: "Supabase server configuration is missing" },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const folder = (formData.get("folder") as string | null) || "about";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  const fileExt = file.name.includes(".")
    ? file.name.split(".").pop()?.toLowerCase()
    : "bin";
  const fileName = `${randomUUID()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabase.storage
    .from("image")
    .upload(filePath, fileBuffer, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || "application/octet-stream",
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("image").getPublicUrl(filePath);

  return NextResponse.json({ publicUrl, path: filePath });
}

"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";

async function requireTeacherAccess() {
  if (!isSupabaseConfigured()) {
    return;
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();

  if (!profile || !["teacher", "admin"].includes(profile.role)) {
    redirect("/dashboard");
  }
}

async function uploadFile(bucket: string, file: File | null) {
  if (!file || !file.size || !isSupabaseConfigured()) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
  const path = `${Date.now()}-${safeName}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage.from(bucket).upload(path, bytes, {
    contentType: file.type,
    upsert: false
  });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function createCourse(formData: FormData) {
  await requireTeacherAccess();

  if (!isSupabaseConfigured()) {
    redirect("/admin?created=demo-course");
  }

  const supabase = await createServerSupabaseClient();
  const title = String(formData.get("title") ?? "");

  await supabase.from("courses").insert({
    title,
    slug: String(formData.get("slug") ?? title.toLowerCase().replace(/[^a-z0-9]+/g, "-")),
    description: String(formData.get("description") ?? ""),
    level: String(formData.get("level") ?? "General English"),
    published: true
  });

  redirect("/admin?created=course");
}

export async function createLesson(formData: FormData) {
  await requireTeacherAccess();

  if (!isSupabaseConfigured()) {
    redirect("/admin?created=demo-lesson");
  }

  const videoFile = formData.get("videoFile");
  const pdfFile = formData.get("pdfFile");
  const [videoUrlFromUpload, pdfUrlFromUpload] = await Promise.all([
    uploadFile("lesson-videos", videoFile instanceof File ? videoFile : null),
    uploadFile("lesson-pdfs", pdfFile instanceof File ? pdfFile : null)
  ]);

  const supabase = await createServerSupabaseClient();

  await supabase.from("lessons").insert({
    course_id: String(formData.get("courseId") ?? ""),
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    position: Number(formData.get("position") ?? 1),
    video_url: videoUrlFromUpload || String(formData.get("videoUrl") ?? ""),
    pdf_url: pdfUrlFromUpload || String(formData.get("pdfUrl") ?? ""),
    published: true
  });

  redirect("/admin?created=lesson");
}

export async function createResource(formData: FormData) {
  await requireTeacherAccess();

  if (!isSupabaseConfigured()) {
    redirect("/admin?created=demo-resource");
  }

  const file = formData.get("file");
  const fileUrl = await uploadFile("resource-files", file instanceof File ? file : null);
  const supabase = await createServerSupabaseClient();

  await supabase.from("resources").insert({
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    category: String(formData.get("category") ?? "Handout"),
    file_url: fileUrl || String(formData.get("fileUrl") ?? "")
  });

  redirect("/admin?created=resource");
}

export async function createAnnouncement(formData: FormData) {
  await requireTeacherAccess();

  if (!isSupabaseConfigured()) {
    redirect("/admin?created=demo-announcement");
  }

  const supabase = await createServerSupabaseClient();

  await supabase.from("announcements").insert({
    title: String(formData.get("title") ?? ""),
    body: String(formData.get("body") ?? ""),
    audience: String(formData.get("audience") ?? "all")
  });

  redirect("/admin?created=announcement");
}

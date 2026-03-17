import type { User } from "@supabase/supabase-js";

export type LessonRecord = {
  id: string;
  course_id: string;
  courseSlug: string;
  courseTitle: string;
  title: string;
  slug: string;
  summary: string;
  video_url: string;
  pdf_url: string;
  position: number;
};

export type CourseRecord = {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  teacher_id?: string | null;
  lessons: LessonRecord[];
};

export type ResourceRecord = {
  id: string;
  title: string;
  description: string;
  category: string;
  file_url: string;
};

export type AnnouncementRecord = {
  id: string;
  title: string;
  body: string;
  audience: string;
  published_at: string;
};

export type PortalSnapshot = {
  courses: CourseRecord[];
  lessons: LessonRecord[];
  resources: ResourceRecord[];
  announcements: AnnouncementRecord[];
};

export type CurrentUserProfile = {
  user: User | null;
  email: string;
  fullName: string;
  role: string;
};

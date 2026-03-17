import { cache } from "react";
import { createServerSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type {
  AnnouncementRecord,
  CourseRecord,
  CurrentUserProfile,
  LessonRecord,
  PortalSnapshot,
  ResourceRecord
} from "@/lib/types";

const sampleCourses: CourseRecord[] = [
  {
    id: "course-1",
    title: "Everyday English Foundations",
    slug: "everyday-english-foundations",
    level: "A2-B1",
    description: "Build confidence in daily conversation, listening, and practical grammar.",
    teacher_id: "teacher-1",
    lessons: []
  },
  {
    id: "course-2",
    title: "Speaking for Work and Study",
    slug: "speaking-for-work-and-study",
    level: "B1-B2",
    description: "Practice presentations, discussions, and academic speaking strategies.",
    teacher_id: "teacher-1",
    lessons: []
  },
  {
    id: "course-3",
    title: "IELTS Writing Bootcamp",
    slug: "ielts-writing-bootcamp",
    level: "B2-C1",
    description: "Teacher-led writing tasks, model answers, and downloadable correction sheets.",
    teacher_id: "teacher-1",
    lessons: []
  }
];

const sampleLessons: LessonRecord[] = [
  {
    id: "lesson-1",
    course_id: "course-1",
    courseSlug: "everyday-english-foundations",
    courseTitle: "Everyday English Foundations",
    title: "Introducing Yourself Clearly",
    slug: "introducing-yourself-clearly",
    summary: "Learn simple frameworks for greetings, self-introductions, and follow-up questions.",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    position: 1
  },
  {
    id: "lesson-2",
    course_id: "course-1",
    courseSlug: "everyday-english-foundations",
    courseTitle: "Everyday English Foundations",
    title: "Asking Better Everyday Questions",
    slug: "asking-better-everyday-questions",
    summary: "Question forms for shops, travel, and daily conversation practice.",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    position: 2
  },
  {
    id: "lesson-3",
    course_id: "course-2",
    courseSlug: "speaking-for-work-and-study",
    courseTitle: "Speaking for Work and Study",
    title: "Leading a Short Presentation",
    slug: "leading-a-short-presentation",
    summary: "Structure a 3-minute talk with openings, transitions, and confident endings.",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    position: 1
  },
  {
    id: "lesson-4",
    course_id: "course-3",
    courseSlug: "ielts-writing-bootcamp",
    courseTitle: "IELTS Writing Bootcamp",
    title: "Task 2 Essay Structure",
    slug: "task-2-essay-structure",
    summary: "Plan introductions, body paragraphs, and conclusions with a repeatable template.",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    position: 1
  }
];

const sampleResources: ResourceRecord[] = [
  {
    id: "resource-1",
    title: "Weekly Vocabulary Tracker",
    description: "A printable sheet for collecting new words, examples, and personal notes.",
    category: "Worksheet",
    file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "resource-2",
    title: "Speaking Prompt Pack",
    description: "Discussion prompts for pair practice and short speaking homework.",
    category: "Speaking",
    file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "resource-3",
    title: "Grammar Review Guide",
    description: "A concise revision PDF covering sentence patterns used across beginner courses.",
    category: "Grammar",
    file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
];

const sampleAnnouncements: AnnouncementRecord[] = [
  {
    id: "announcement-1",
    title: "This week: speaking practice submissions",
    body: "Please upload your short speaking recording by Friday. Focus on fluency, not perfect grammar.\n\nUse the worksheet from the resource library before recording.",
    audience: "all",
    published_at: "2026-03-17T09:00:00.000Z"
  },
  {
    id: "announcement-2",
    title: "New IELTS writing lesson published",
    body: "The new Task 2 lesson is available now. Review the PDF before next class so we can spend more time on feedback.",
    audience: "advanced",
    published_at: "2026-03-15T09:00:00.000Z"
  }
];

function attachLessons(courses: CourseRecord[], lessons: LessonRecord[]) {
  return courses.map((course) => ({
    ...course,
    lessons: lessons
      .filter((lesson) => lesson.course_id === course.id)
      .sort((a, b) => a.position - b.position)
  }));
}

export const getPortalSnapshot = cache(async (): Promise<PortalSnapshot> => {
  if (!isSupabaseConfigured()) {
    return {
      courses: attachLessons(sampleCourses, sampleLessons),
      lessons: sampleLessons,
      resources: sampleResources,
      announcements: sampleAnnouncements
    };
  }

  const supabase = await createServerSupabaseClient();
  const [coursesRes, lessonsRes, resourcesRes, announcementsRes] = await Promise.all([
    supabase
      .from("courses")
      .select("id, title, slug, description, level, teacher_id")
      .eq("published", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("lessons")
      .select("id, course_id, title, slug, summary, video_url, pdf_url, position, courses(title, slug)")
      .eq("published", true)
      .order("position", { ascending: true }),
    supabase
      .from("resources")
      .select("id, title, description, category, file_url")
      .order("created_at", { ascending: false }),
    supabase
      .from("announcements")
      .select("id, title, body, audience, published_at")
      .order("published_at", { ascending: false })
  ]);

  const lessons: LessonRecord[] = (lessonsRes.data ?? []).map((lesson: any) => ({
    id: lesson.id,
    course_id: lesson.course_id,
    title: lesson.title,
    slug: lesson.slug,
    summary: lesson.summary ?? "",
    video_url: lesson.video_url ?? "",
    pdf_url: lesson.pdf_url ?? "",
    position: lesson.position ?? 1,
    courseTitle: lesson.courses?.title ?? "Course",
    courseSlug: lesson.courses?.slug ?? ""
  }));

  const courses = attachLessons(
    (coursesRes.data ?? []).map((course) => ({
      ...course,
      lessons: []
    })),
    lessons
  );

  return {
    courses,
    lessons,
    resources: (resourcesRes.data ?? []) as ResourceRecord[],
    announcements: (announcementsRes.data ?? []) as AnnouncementRecord[]
  };
});

export const getCurrentUserProfile = cache(async (): Promise<CurrentUserProfile> => {
  if (!isSupabaseConfigured()) {
    return {
      user: null,
      email: "demo@student.portal",
      fullName: "Demo Student",
      role: "teacher"
    };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      user: null,
      email: "",
      fullName: "Guest",
      role: "student"
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  return {
    user,
    email: user.email ?? "",
    fullName: profile?.full_name || (user.user_metadata.full_name as string) || "Portal User",
    role: profile?.role || "student"
  };
});

export async function getCourseBySlug(slug: string) {
  const snapshot = await getPortalSnapshot();
  return snapshot.courses.find((course) => course.slug === slug);
}

export async function getLessonById(id: string) {
  const snapshot = await getPortalSnapshot();
  return snapshot.lessons.find((lesson) => lesson.id === id);
}

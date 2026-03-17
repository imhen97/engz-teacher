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
    title: "일상 영어회화 기초",
    slug: "everyday-english-foundations",
    level: "A2-B1",
    description: "일상 대화, 듣기, 실용 문법을 자연스럽게 익히는 입문 코스입니다.",
    teacher_id: "teacher-1",
    lessons: []
  },
  {
    id: "course-2",
    title: "업무와 학습을 위한 스피킹",
    slug: "speaking-for-work-and-study",
    level: "B1-B2",
    description: "발표, 토론, 학업용 말하기 전략을 실전 중심으로 연습합니다.",
    teacher_id: "teacher-1",
    lessons: []
  },
  {
    id: "course-3",
    title: "IELTS 라이팅 집중반",
    slug: "ielts-writing-bootcamp",
    level: "B2-C1",
    description: "모범답안, 첨삭 포인트, PDF 보조자료로 라이팅 실력을 끌어올립니다.",
    teacher_id: "teacher-1",
    lessons: []
  }
];

const sampleLessons: LessonRecord[] = [
  {
    id: "lesson-1",
    course_id: "course-1",
    courseSlug: "everyday-english-foundations",
    courseTitle: "일상 영어회화 기초",
    title: "자연스럽게 자기소개하기",
    slug: "introducing-yourself-clearly",
    summary: "인사, 자기소개, 이어지는 질문까지 기본 흐름을 익히는 레슨입니다.",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    position: 1
  },
  {
    id: "lesson-2",
    course_id: "course-1",
    courseSlug: "everyday-english-foundations",
    courseTitle: "일상 영어회화 기초",
    title: "일상에서 더 좋은 질문하기",
    slug: "asking-better-everyday-questions",
    summary: "쇼핑, 여행, 일상 대화에서 자주 쓰는 질문 표현을 연습합니다.",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    position: 2
  },
  {
    id: "lesson-3",
    course_id: "course-2",
    courseSlug: "speaking-for-work-and-study",
    courseTitle: "업무와 학습을 위한 스피킹",
    title: "짧은 발표 자신 있게 하기",
    slug: "leading-a-short-presentation",
    summary: "3분 발표를 위한 도입, 전개, 마무리 표현을 구조적으로 익힙니다.",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    position: 1
  },
  {
    id: "lesson-4",
    course_id: "course-3",
    courseSlug: "ielts-writing-bootcamp",
    courseTitle: "IELTS 라이팅 집중반",
    title: "Task 2 에세이 구조 잡기",
    slug: "task-2-essay-structure",
    summary: "도입, 본문, 결론을 안정적으로 쓰는 반복 가능한 템플릿을 배웁니다.",
    video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    pdf_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    position: 1
  }
];

const sampleResources: ResourceRecord[] = [
  {
    id: "resource-1",
    title: "주간 어휘 정리표",
    description: "새 단어, 예문, 개인 메모를 정리할 수 있는 출력용 학습지입니다.",
    category: "워크시트",
    file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "resource-2",
    title: "스피킹 질문 세트",
    description: "짝 활동과 숙제 말하기 연습에 바로 쓸 수 있는 질문 모음입니다.",
    category: "스피킹",
    file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: "resource-3",
    title: "문법 복습 가이드",
    description: "초급 강의에서 자주 다루는 핵심 문장 구조를 정리한 복습 PDF입니다.",
    category: "문법",
    file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
];

const sampleAnnouncements: AnnouncementRecord[] = [
  {
    id: "announcement-1",
    title: "이번 주 스피킹 과제 제출 안내",
    body: `금요일까지 짧은 스피킹 녹음을 업로드해 주세요. 완벽한 문법보다 자연스러운 말하기 흐름에 집중하면 됩니다.\n\n녹음 전에는 자료실의 워크시트를 먼저 확인해 주세요.`,
    audience: "전체",
    published_at: "2026-03-17T09:00:00.000Z"
  },
  {
    id: "announcement-2",
    title: "IELTS 라이팅 신규 레슨 오픈",
    body: "새로운 Task 2 레슨이 업로드되었습니다. 다음 수업 전까지 PDF를 먼저 보고 오면 피드백 시간을 더 효율적으로 쓸 수 있습니다.",
    audience: "고급반",
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
    courseTitle: lesson.courses?.title ?? "강의",
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
      fullName: "데모 학생",
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
      fullName: "게스트",
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
    fullName: profile?.full_name || (user.user_metadata.full_name as string) || "포털 사용자",
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

import { ShieldAlert } from "lucide-react";
import {
  createAnnouncement,
  createCourse,
  createLesson,
  createResource
} from "./actions";
import { getCurrentUserProfile, getPortalSnapshot } from "@/lib/data";

type AdminPageProps = {
  searchParams: Promise<{ created?: string }>;
};

const createdLabel: Record<string, string> = {
  course: "강의가 생성되었습니다.",
  lesson: "레슨이 생성되었습니다.",
  resource: "자료가 생성되었습니다.",
  announcement: "공지사항이 생성되었습니다.",
  "demo-course": "데모 강의가 생성된 것으로 처리되었습니다.",
  "demo-lesson": "데모 레슨이 생성된 것으로 처리되었습니다.",
  "demo-resource": "데모 자료가 생성된 것으로 처리되었습니다.",
  "demo-announcement": "데모 공지가 생성된 것으로 처리되었습니다."
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const profile = await getCurrentUserProfile();
  const snapshot = await getPortalSnapshot();
  const params = await searchParams;
  const canManage = ["teacher", "admin"].includes(profile.role);

  if (!canManage) {
    return (
      <div className="panel flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
        <ShieldAlert className="h-10 w-10 text-coral" />
        <h1 className="mt-4 text-3xl font-semibold">선생님 권한이 필요합니다</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
          관리자 화면은 teacher 또는 admin 계정만 사용할 수 있습니다. 업로드와 게시 기능을 사용하려면
          `profiles` 테이블에서 역할을 변경하세요.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {params.created ? (
        <div className="rounded-3xl border border-teal/20 bg-teal/10 px-5 py-4 text-sm text-teal">
          {createdLabel[params.created] ?? "작업이 완료되었습니다."}
        </div>
      ) : null}
      <section className="panel p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-teal">관리자 페이지</p>
        <h1 className="mt-4 text-4xl font-semibold">레슨을 등록하고 포털을 관리하세요.</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          선생님은 새 강의를 만들고, 영상과 PDF가 포함된 레슨을 업로드하고, 자료실 파일과 공지사항을 게시할 수 있습니다.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <form action={createCourse} className="panel space-y-4 p-6">
          <h2 className="text-2xl font-semibold">강의 만들기</h2>
          <input name="title" className="field" placeholder="강의 제목" required />
          <input name="slug" className="field" placeholder="course-slug" required />
          <input name="level" className="field" placeholder="CEFR B1 / 회화 / IELTS" required />
          <textarea
            name="description"
            className="field min-h-32"
            placeholder="강의 설명"
            required
          />
          <button className="button-primary">강의 게시</button>
        </form>

        <form action={createAnnouncement} className="panel space-y-4 p-6">
          <h2 className="text-2xl font-semibold">공지 등록</h2>
          <input name="title" className="field" placeholder="공지 제목" required />
          <select name="audience" className="field" defaultValue="all">
            <option value="all">전체 수강생</option>
            <option value="beginner">초급반</option>
            <option value="intermediate">중급반</option>
            <option value="advanced">고급반</option>
          </select>
          <textarea name="body" className="field min-h-32" placeholder="공지 내용" required />
          <button className="button-primary">공지 게시</button>
        </form>

        <form action={createLesson} className="panel space-y-4 p-6" encType="multipart/form-data">
          <h2 className="text-2xl font-semibold">레슨 업로드</h2>
          <select name="courseId" className="field" defaultValue="" required>
            <option value="" disabled>
              강의를 선택하세요
            </option>
            {snapshot.courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          <input name="title" className="field" placeholder="레슨 제목" required />
          <input name="slug" className="field" placeholder="lesson-slug" required />
          <input name="position" type="number" className="field" placeholder="순서 번호" required />
          <textarea name="summary" className="field min-h-28" placeholder="레슨 설명" required />
          <input name="videoUrl" className="field" placeholder="임베드 영상 URL (선택)" />
          <input name="pdfUrl" className="field" placeholder="PDF URL (선택)" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="videoFile" type="file" accept="video/*" className="field" />
            <input name="pdfFile" type="file" accept="application/pdf" className="field" />
          </div>
          <button className="button-primary">레슨 게시</button>
        </form>

        <form action={createResource} className="panel space-y-4 p-6" encType="multipart/form-data">
          <h2 className="text-2xl font-semibold">자료 업로드</h2>
          <input name="title" className="field" placeholder="자료 제목" required />
          <input name="category" className="field" placeholder="워크시트 / 단어장 / 가이드" required />
          <textarea
            name="description"
            className="field min-h-28"
            placeholder="짧은 설명"
            required
          />
          <input name="fileUrl" className="field" placeholder="직접 파일 URL (선택)" />
          <input name="file" type="file" className="field" />
          <button className="button-primary">자료 게시</button>
        </form>
      </section>
    </div>
  );
}

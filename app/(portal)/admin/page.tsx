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

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const profile = await getCurrentUserProfile();
  const snapshot = await getPortalSnapshot();
  const params = await searchParams;
  const canManage = ["teacher", "admin"].includes(profile.role);

  if (!canManage) {
    return (
      <div className="panel flex min-h-[60vh] flex-col items-center justify-center p-8 text-center">
        <ShieldAlert className="h-10 w-10 text-coral" />
        <h1 className="mt-4 text-3xl font-semibold">Teacher access required</h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
          The admin area is reserved for teacher and admin accounts. Update the role in the
          `profiles` table to unlock upload and publishing actions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {params.created ? (
        <div className="rounded-3xl border border-teal/20 bg-teal/10 px-5 py-4 text-sm text-teal">
          Created: {params.created}
        </div>
      ) : null}
      <section className="panel p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-teal">Admin panel</p>
        <h1 className="mt-4 text-4xl font-semibold">Publish lessons and manage the portal.</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          Teachers can create new courses, upload lesson videos and PDFs, publish resource files,
          and post announcements for students.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <form action={createCourse} className="panel space-y-4 p-6">
          <h2 className="text-2xl font-semibold">Create course</h2>
          <input name="title" className="field" placeholder="Course title" required />
          <input name="slug" className="field" placeholder="course-slug" required />
          <input name="level" className="field" placeholder="CEFR B1 / Conversation / IELTS" required />
          <textarea
            name="description"
            className="field min-h-32"
            placeholder="Course description"
            required
          />
          <button className="button-primary">Publish course</button>
        </form>

        <form action={createAnnouncement} className="panel space-y-4 p-6">
          <h2 className="text-2xl font-semibold">Post announcement</h2>
          <input name="title" className="field" placeholder="Announcement title" required />
          <select name="audience" className="field" defaultValue="all">
            <option value="all">All students</option>
            <option value="beginner">Beginner classes</option>
            <option value="intermediate">Intermediate classes</option>
            <option value="advanced">Advanced classes</option>
          </select>
          <textarea name="body" className="field min-h-32" placeholder="Message" required />
          <button className="button-primary">Publish announcement</button>
        </form>

        <form action={createLesson} className="panel space-y-4 p-6" encType="multipart/form-data">
          <h2 className="text-2xl font-semibold">Upload lesson</h2>
          <select name="courseId" className="field" defaultValue="" required>
            <option value="" disabled>
              Select course
            </option>
            {snapshot.courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          <input name="title" className="field" placeholder="Lesson title" required />
          <input name="slug" className="field" placeholder="lesson-slug" required />
          <input name="position" type="number" className="field" placeholder="Order number" required />
          <textarea name="summary" className="field min-h-28" placeholder="Lesson summary" required />
          <input name="videoUrl" className="field" placeholder="Embedded video URL (optional)" />
          <input name="pdfUrl" className="field" placeholder="PDF URL (optional)" />
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="videoFile" type="file" accept="video/*" className="field" />
            <input name="pdfFile" type="file" accept="application/pdf" className="field" />
          </div>
          <button className="button-primary">Publish lesson</button>
        </form>

        <form action={createResource} className="panel space-y-4 p-6" encType="multipart/form-data">
          <h2 className="text-2xl font-semibold">Upload resource</h2>
          <input name="title" className="field" placeholder="Resource title" required />
          <input name="category" className="field" placeholder="Worksheet / Vocabulary / Guide" required />
          <textarea
            name="description"
            className="field min-h-28"
            placeholder="Short description"
            required
          />
          <input name="fileUrl" className="field" placeholder="Direct file URL (optional)" />
          <input name="file" type="file" className="field" />
          <button className="button-primary">Publish resource</button>
        </form>
      </section>
    </div>
  );
}

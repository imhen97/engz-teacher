import { CourseCard } from "@/components/course-card";
import { SectionHeading } from "@/components/section-heading";
import { getPortalSnapshot } from "@/lib/data";

export default async function CoursesPage() {
  const snapshot = await getPortalSnapshot();

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="강의"
        title="강의 목록"
        description="선생님이 등록한 강의를 레벨별로 확인하고 각 레슨 순서대로 학습할 수 있습니다."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {snapshot.courses.map((course) => (
          <CourseCard key={course.id} course={course} lessonCount={course.lessons.length} />
        ))}
      </div>
    </div>
  );
}

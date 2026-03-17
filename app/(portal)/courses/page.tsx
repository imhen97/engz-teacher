import { CourseCard } from "@/components/course-card";
import { SectionHeading } from "@/components/section-heading";
import { getPortalSnapshot } from "@/lib/data";

export default async function CoursesPage() {
  const snapshot = await getPortalSnapshot();

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Courses"
        title="Course catalog"
        description="Browse teacher-published courses by level and open each lesson sequence."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {snapshot.courses.map((course) => (
          <CourseCard key={course.id} course={course} lessonCount={course.lessons.length} />
        ))}
      </div>
    </div>
  );
}

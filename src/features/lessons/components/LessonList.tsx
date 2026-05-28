import { Lesson, Unit } from "@prisma/client";
 
import LessonCard from "./LessonCard";
import EmptyLessons from "./EmptyLesson";
 
interface Props {
  lessons: Lesson[];
  units: Unit[];
}
 
export default function LessonsList({
  lessons,
  units
}: Props) {
  if (!lessons.length) {
    console.error("here",lessons.length)
    return <EmptyLessons />;
  }
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          units={units}
        />
      ))}
    </div>
  );
}
 
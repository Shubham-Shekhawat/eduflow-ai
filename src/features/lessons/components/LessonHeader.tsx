import LessonModal from "./LessonModalServer";

export default function LessonsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">
          Lessons
        </h1>
 
        <p className="text-gray-500 mt-1">
          Manage your curriculum lessons
        </p>
      </div>
 
      <LessonModal />
    </div>
  );
}
 
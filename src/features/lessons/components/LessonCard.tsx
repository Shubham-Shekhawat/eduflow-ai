"use client";
 
import { Lesson, Unit } from "@prisma/client";
 
import { deleteLessonAction } from "../actions/delete-lesson.action";
import { hasPermission } from "@/lib/rbac";
import LessonModalClient from "./LessonModalClient";
 
interface Props {
  lesson: Lesson;
  units: Unit[];
}
 
export default function LessonCard({
  lesson,
  units
}: Props) {
  const handleDelete = async () => {
    const confirmed = confirm(
      "Delete this lesson?"
    );
 
    if (!confirmed) return;
 
    const res =await deleteLessonAction(lesson.id);

    
if (res?.error) {
    alert(res.error);
    return;
  }

  };
 
  return (
    <div className="bg-white rounded-xl border p-5">
      <h2 className="font-semibold text-lg">
        {lesson.title}
      </h2>
 
      <p className="text-gray-500 text-sm mt-2">
        {lesson.description}
      </p>
 
      <div className="flex gap-2 mt-4">
        <LessonModalClient lesson={lesson} units={units} />
 
        <button
          onClick={handleDelete}
          className="border border-red-500 text-red-500 px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
 
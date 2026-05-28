// "use client";

// import { useEffect, useState } from "react";

// export default function LessonsPage() {
//   const [lessons, setLessons] = useState<any[]>([]);
//   const [title, setTitle] = useState("");

//   // ✅ fetch lessons
//   const fetchLessons = async () => {
//     const res = await fetch("/api/lessons");
//     const data = await res.json();
//     setLessons(data.data || []);
//   };

//   useEffect(() => {
//     fetchLessons();
//   }, []);

//   // ✅ create lesson
//   const handleCreate = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await fetch("/api/lessons", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title,
//         content: "Sample content",
//         gradeLevel: "Grade 10",
//         duration: 30,
//         objectives: ["Understand basics"],
//         activities: ["Practice"],
//         difficulty: "BEGINNER",
//         unitId: "cmpmci48n00012k6hsccpc9h8",
//         tags: ["demo"],
//       }),
//     });

//     if (res.ok) {
//       setTitle("");
//       fetchLessons();
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Lessons</h1>

//       {/* ✅ CREATE FORM */}
//       <form
//         onSubmit={handleCreate}
//         className="flex gap-2"
//       >
//         <input
//           className="border p-2 rounded w-64"
//           placeholder="Lesson title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <button className="bg-black text-white px-4 rounded">
//           Create
//         </button>
//       </form>

//       {/* ✅ LESSON LIST */}
//       <div className="space-y-2">
//         {lessons.map((lesson) => (
//           <div
//             key={lesson.id}
//             className="border p-4 rounded flex justify-between"
//           >
//             <span>{lesson.title}</span>

//             {/* future actions */}
//             <div className="flex gap-2">
//               <button className="text-blue-600">Edit</button>
//               <button className="text-red-600">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import LessonsHeader from "@/features/lessons/components/LessonHeader";
import { redirect } from "next/navigation";
 
import LessonsList from "@/features/lessons/components/LessonList";
 
import { getLessonsService } from "@/features/lessons/services/lesson.service";
import { getUnitsService } from "@/features/units/services/unit.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

 
export default async function LessonsPage() {
  const session = await getServerSession(authOptions);
 
  if (!session) {
    //rediirect to login or show message
    console.error("Session not found")
    redirect("/login");
    return null;
  }
  
  const result = await getLessonsService(session.user.id ,1, 12);
  const units = await getUnitsService(1, 12);
 
  return (
    <div className="space-y-6">
      <LessonsHeader />
 
      <LessonsList lessons={result.data} units={units.data} />
    </div>
  );
}
 
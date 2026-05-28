import { getSubjectsService } from "@/features/subjects/services/subject.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SubjectModal from "@/features/subjects/componenets/SubjectModal";
import SubjectsHeader from "@/features/subjects/componenets/SubjectHeader";
import { redirect } from "next/navigation";

export default async function SubjectsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
        //rediirect to login or show message
        console.error("Session not found")
        redirect("/login");
      }

  const result = await getSubjectsService(1, 12);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <SubjectsHeader/>

      {/* ✅ List render */}
      <div className="grid gap-4">
        {result.data.map((subject: any) => (
          <div
            key={subject.id}
            className="p-4 border rounded-xl flex justify-between"
          >
            <div>
              <h2 className="font-semibold">{subject.name}</h2>
              <p className="text-sm text-gray-500">
                {subject.description}
              </p>
            </div>

            <div className="flex gap-2">
              {/* ✅ Edit modal */}
              <SubjectModal subject={subject} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
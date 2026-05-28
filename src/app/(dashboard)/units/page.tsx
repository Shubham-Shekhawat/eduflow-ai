import { prisma } from "@/lib/prisma";
import UnitModal from "@/features/units/componenets/UnitModal";
import { getUnitsService } from "@/features/units/services/unit.service";
import { getSubjectsService } from "@/features/subjects/services/subject.service";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function UnitsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    //rediirect to login or show message
    console.error("Session not found")
    redirect("/login");
  }
  const units = await getUnitsService(1,12);

  // const subjects = await prisma.subject.findMany();
  const subjects = await getSubjectsService(1,12);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Units</h1>

        <UnitModal subjects={subjects.data} />
      </div>

      {/* List */}
      <div className="grid gap-4">
        {units.data.map((unit) => (
          <div
            key={unit.id}
            className="p-4 border rounded-xl flex justify-between"
          >
            <div>
              <h2 className="font-semibold">{unit.title}</h2>

              <p className="text-sm text-gray-500">
                {unit.description}
              </p>

              <p className="text-xs text-gray-400">
                Subject: {subjects.data.filter((sub)=> sub.id ==unit.subjectId)[0].name}
              </p>
            </div>

            <UnitModal unit={unit} subjects={subjects.data} />
          </div>
        ))}
      </div>
    </div>
  );
}
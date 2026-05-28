import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDashboardStats } from "@/features/dashboard/services/dashboard.service";
import { redirect } from "next/navigation";
 
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
 
  if (!session) {
      //rediirect to login or show message
      console.error("Session not found")
      redirect("/login");
    }
 
  const stats = await getDashboardStats(session.user.id);
 
  return (
    <div className="space-y-6">
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white border rounded-xl">
          <p className="text-sm text-gray-500">
            Total Lessons
          </p>
          <h2 className="text-2xl font-bold">
            {stats.total}
          </h2>
        </div>
 
        <div className="p-4 bg-white border rounded-xl">
          <p className="text-sm text-gray-500">
            Published
          </p>
          <h2 className="text-2xl font-bold">
            {stats.published}
          </h2>
        </div>
 
        <div className="p-4 bg-white border rounded-xl">
          <p className="text-sm text-gray-500">
            Drafts
          </p>
          <h2 className="text-2xl font-bold">
            {stats.draft}
          </h2>
        </div>
      </div>
 
      {/* RECENT LESSONS */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold mb-4">
          Recent Lessons
        </h2>
 
        <div className="space-y-3">
          {stats.recent.map((lesson) => (
            <div
              key={lesson.id}
              className="flex justify-between border-b pb-2"
            >
              <div>
                <p className="font-medium">
                  {lesson.title}
                </p>
                <p className="text-sm text-gray-500">
                  {lesson.status}
                </p>
              </div>
 
              <div className="text-sm text-gray-400">
                {new Date(
                  lesson.createdAt
                ).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
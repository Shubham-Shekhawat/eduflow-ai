"use server";
 
import { revalidatePath } from "next/cache";
 
import { deleteLessonService } from "@/features/lessons/services/lesson.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { hasPermission } from "@/lib/rbac";
 
export async function deleteLessonAction(
  id: string
) {

    const session = await getServerSession(authOptions);
 
  if (!session) {
    throw new Error("Unauthorized");
  }


  
if (!hasPermission(session.user.role, "lesson", "delete")) {
  return { error: "You are not allowed to delete this lesson" };
}


  const res = await deleteLessonService(id , session.user.id);
 
  revalidatePath("/lessons");
 
  return {
    success: true,
  };
}
 
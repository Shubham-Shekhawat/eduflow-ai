"use server";
 
import { revalidatePath } from "next/cache";
 
import { getServerSession } from "next-auth";
 
import { authOptions } from "@/lib/auth";
 
import { updateLessonService } from "@/features/lessons/services/lesson.service";
 
import { updateLessonSchema } from "../validators/update-lesson.schema";
 
export async function updateLessonAction(
  id: string,
  formData: FormData
) {
  const session = await getServerSession(authOptions);
 
  if (!session) {
    throw new Error("Unauthorized");
  }
 
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
    gradeLevel: formData.get("gradeLevel"),
    duration: formData.get("duration"),
    difficulty: formData.get("difficulty"),
  };
 
  const validatedData =
    updateLessonSchema.parse(rawData);

    console.log("Validated Data:", validatedData);
 
  await updateLessonService(
    id,
    session.user.id,
    validatedData
  );
 
  revalidatePath("/lessons");
 
  return {
    success: true,
  };
}
 
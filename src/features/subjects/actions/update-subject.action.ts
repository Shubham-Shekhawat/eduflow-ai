
"use server";
 
import { revalidatePath } from "next/cache";
 
import { getServerSession } from "next-auth";
 
import { authOptions } from "@/lib/auth";
import { updateSubjectSchema } from './../validators/update-subject.schema';
import { updateSubjectsService } from "../services/subject.service";
 
export async function updateSubjectAction(
  id: string,
  data: FormData
) {
  const session = await getServerSession(authOptions);
 
  if (!session) {
    throw new Error("Unauthorized");
  }

  const formData = new FormData();

Object.entries(data).forEach(([key, value]) => {
  formData.append(key, String(value));
});
 
  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
  };
 
  const validatedData =
    updateSubjectSchema.parse(rawData);

    console.log("Validated Data:", validatedData);

  await updateSubjectsService(
    id,
    validatedData
  )
 
  revalidatePath("/subjects");
 
  return {
    success: true,
  };
}
 
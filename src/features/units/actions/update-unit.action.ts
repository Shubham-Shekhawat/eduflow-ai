
"use server";
 
import { revalidatePath } from "next/cache";
 
import { getServerSession } from "next-auth";
 
import { authOptions } from "@/lib/auth";
import { updateUnitService } from "../services/unit.service";
import { updateUnitSchema } from "../validators/update-unit.schema";
 
export async function updateUnitAction(
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

console.log("formdata for unit update" , formData)
 
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    subjectId: formData.get("subjectId"),
  };

  console.log("rawdata for unit update" , rawData)
 
  const validatedData =
    updateUnitSchema.parse(rawData);

    console.log("Validated Data:", validatedData);

  await updateUnitService(
    id,
    validatedData
  )
 
  revalidatePath("/units");
 
  return {
    success: true,
  };
}
 
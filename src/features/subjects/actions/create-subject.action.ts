
"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import {
  CreateSubjectInput,
  createSubjectSchema,
} from "../validators/create-subject.schema";
import { createSubjectService } from './../services/subject.service';


export async function createSubjectAction(data: any) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  console.log("Form Data here:", data);

  
const formData = new FormData();

Object.entries(data).forEach(([key, value]) => {
  formData.append(key, String(value));
});

  const rawData = {
    name: formData.get("name")?.toString() || "",

    description: formData.get("description")?.toString() || "",
  };

  const validatedData = createSubjectSchema.parse(rawData);

  await createSubjectService({
    data:validatedData
  })

  return {
    success: true,
  };
}

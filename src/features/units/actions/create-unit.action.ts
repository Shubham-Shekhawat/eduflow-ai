"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import { createUnitSchema } from "../validators/create-unit.schema";

import { createUnitService } from "../services/unit.service";

export async function createUnitAction(data: any) {
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
    title: formData.get("title")?.toString() || "",

    description: formData.get("description")?.toString() || "",
    subjectId: formData.get("subjectId")?.toString() || "",

    
  };

  const validatedData = createUnitSchema.parse(rawData);

  await createUnitService({
    data: validatedData,
  });

  return {
    success: true,
  };
}

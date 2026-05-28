"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import {
  CreateLessonInput,
  createLessonSchema,
} from "../validators/create-lesson.schema";
import { createLessonService } from "@/features/lessons/services/lesson.service";

import { hasPermission } from "@/lib/rbac";

export async function createLessonAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (!hasPermission(session.user.role, "lesson", "create")) {
    throw new Error("Forbidden");
  }

  console.log("Form Data here:", Object.fromEntries(formData.entries()));
  const rawData = {
    title: formData.get("title")?.toString() || "",

    description: formData.get("description")?.toString() || "",

    content: formData.get("content")?.toString() || "",

    gradeLevel: formData.get("gradeLevel")?.toString() || "",

    duration: Number(formData.get("duration")),

    objectives: formData.get("objectives")?.toString() || "",

    activities: formData.get("activities")?.toString() || "",

    homework: formData.get("homework")?.toString() || "",

    tags: formData.get("tags")?.toString() || "",

    status: formData.get("status")?.toString() || "DRAFT",

    difficulty: formData.get("difficulty")?.toString() || "BEGINNER",

    unitId: formData.get("unitId")?.toString() || "",
  };

  const validatedData = createLessonSchema.parse(rawData);

  await createLessonService({
    data: validatedData,
    userId: session.user.id,
  });

  return {
    success: true,
  };
}

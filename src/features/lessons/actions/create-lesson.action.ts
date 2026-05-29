"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import { createLessonSchema } from "../validators/create-lesson.schema";

import { createLessonService } from "@/features/lessons/services/lesson.service";

import { hasPermission } from "@/lib/rbac";

export async function createLessonAction(
  rawData: any
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  if (
    !hasPermission(
      session.user.role,
      "lesson",
      "create"
    )
  ) {
    throw new Error("Forbidden");
  }

  console.log("Raw Data:", rawData);

  const validatedData =
    createLessonSchema.parse(rawData);

  await createLessonService({
    data: validatedData,
    userId: session.user.id,
  });

  return {
    success: true,
  };
}
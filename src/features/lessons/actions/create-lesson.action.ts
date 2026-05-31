"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import { createLessonFormSchema } from "../validators/create-lesson.schema";
import {
  createLessonSchema
} from "../validators/create-lesson.schema";

import { createLessonService } from "@/features/lessons/services/lesson.service";

import { hasPermission } from "@/lib/rbac";

export async function createLessonAction(rawData: any) {
  try {


    console.log("RAW DATA", rawData);
    const session = await getServerSession(authOptions);
    console.log("Raw Data:", rawData);

    console.log(createLessonFormSchema.shape.objectives);

    const user = session?.user.id

    const validatedData = 
  createLessonSchema.parse(rawData);

    console.log("Validated:", validatedData);

    await createLessonService({
      data: validatedData,
      userId: session?.user.id || "asdfghjklwertyuiop",
    });

    return { success: true };
  } catch (error) {
    console.error("CREATE LESSON ERROR:", error);
    throw error;
  }
}
import * as z from "zod";
import { DifficultyLevel, LessonStatus } from "@prisma/client";

export const updateLessonSchema = z.object({
  title: z.string().min(3).optional(),

  description: z.string().min(10).optional(),

  content: z.string().min(10).optional(),

  gradeLevel: z.string().optional(),

  duration: z.coerce.number().optional(),

  objectives: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val.split(",").map((v) => v.trim()).filter(Boolean)
        : undefined
    ),

  activities: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val.split(",").map((v) => v.trim()).filter(Boolean)
        : undefined
    ),

  homework: z.string().optional(),

  tags: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val.split(",").map((v) => v.trim()).filter(Boolean)
        : undefined
    ),

  status: z.nativeEnum(LessonStatus).optional(),

  difficulty: z.nativeEnum(DifficultyLevel).optional(),

  unitId: z.string().optional(),
});
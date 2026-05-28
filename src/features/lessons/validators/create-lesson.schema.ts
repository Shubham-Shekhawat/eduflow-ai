import { z } from "zod";

import { DifficultyLevel, LessonStatus } from "@prisma/client";

export const createLessonSchema = z.object({
  title: z.string().min(3),

  description: z.string().min(10),

  content: z.string().min(20),

  gradeLevel: z.string(),

  duration: z.coerce.number().min(1),

  objectives: z
    .string()
    .optional()
    .transform((val) =>
      val ? val.split(",").map((v) => v.trim()) : []
    ),

  activities: z
    .string()
    .optional()
    .transform((val) =>
      val ? val.split(",").map((v) => v.trim()) : []
    ),

  homework: z.string().optional(),

  tags: z
    .string()
    .optional()
    .transform((val) =>
      val ? val.split(",").map((v) => v.trim()) : []
    ),

  status: z.nativeEnum(LessonStatus),

  difficulty: z.nativeEnum(DifficultyLevel),

  unitId: z.string(),
});

// ✅ what form receives
export type CreateLessonFormInput = z.input<typeof createLessonSchema>;

// ✅ what backend uses
export type CreateLessonInput = z.infer<typeof createLessonSchema>;

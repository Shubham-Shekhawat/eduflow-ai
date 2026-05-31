import { z } from "zod";

import { DifficultyLevel, LessonStatus } from "@prisma/client";

export const createLessonFormSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  content: z.string().min(20),

  gradeLevel: z.string(),
  duration: z.coerce.number().min(1),

  objectives: z
    .string()
    .optional()
    .transform(val =>
      val ? val.split(",").map(v => v.trim()) : []
    ),

  activities: z
    .string()
    .optional()
    .transform(val =>
      val ? val.split(",").map(v => v.trim()) : []
    ),

  tags: z
    .string()
    .optional()
    .transform(val =>
      val ? val.split(",").map(v => v.trim()) : []
    ),

  homework: z.string().optional(),

  status: z.nativeEnum(LessonStatus),

  difficulty: z.nativeEnum(DifficultyLevel),

  unitId: z.string(),
});


export const createLessonSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  content: z.string().min(20),

  gradeLevel: z.string(),
  duration: z.number(),

  objectives: z.array(z.string()).optional(),
  activities: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),

  homework: z.string().optional(),

  status: z.nativeEnum(LessonStatus),
  difficulty: z.nativeEnum(DifficultyLevel),

  unitId: z.string(),
});

// Form values before transform
export type CreateLessonFormInput =
  z.input<typeof createLessonFormSchema>;

// Data after transform (arrays)
export type CreateLessonInput =
  z.infer<typeof createLessonSchema>;
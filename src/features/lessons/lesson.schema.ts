import { z } from "zod";
import { LessonStatus , DifficultyLevel } from "@prisma/client";

export const createLessonSchema = z.object({
  title: z.string().min(3),

  description: z.string().min(10),

  content: z.string().min(20),

  gradeLevel: z.string(),

  duration: z.coerce.number().min(1),

  objectives: z.array(z.string()).optional(),

  activities: z.array(z.string()).optional(),

  tags: z.array(z.string()).optional(),

  homework: z.string().optional(),

  status: z.nativeEnum(LessonStatus),

  difficulty: z.nativeEnum(DifficultyLevel),

  unitId: z.string(),
});

export const updateLessonSchema =
  createLessonSchema.partial();

export type CreateLessonInput =
  z.infer<typeof createLessonSchema>;

export type UpdateLessonInput =
  z.infer<typeof updateLessonSchema>;

export type CreateLessonFormInput = {
  title: string;
  description?: string;
  content: string;
  gradeLevel: string;
  duration: number;

  objectives: string[];
  activities: string[];

  homework?: string;

  difficulty:
    | "BEGINNER"
    | "INTERMEDIATE"
    | "ADVANCED";

  status:
    | "DRAFT"
    | "PUBLISHED"
    | "ARCHIVED";

  tags?: string[];

  unitId: string;
};
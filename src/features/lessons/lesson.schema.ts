import { z } from "zod";

export const createLessonSchema = z.object({
  title: z.string().min(3),

  description: z.string().optional(),

  content: z.string().min(10),

  gradeLevel: z.string(),

  duration: z.coerce.number().min(1),

  objectives: z
    .string()
    .transform((val) =>
      val
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean)
    ),

  activities: z
    .string()
    .transform((val) =>
      val
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean)
    ),

  homework: z.string().optional(),

  difficulty: z.enum([
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
  ]),

  status: z.enum([
    "DRAFT",
    "PUBLISHED",
    "ARCHIVED",
  ]),

  tags: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean)
        : []
    ),

  unitId: z.string().min(1),
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
  objectives: string;
  activities: string;
  homework?: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  tags?: string;
  unitId: string;
};
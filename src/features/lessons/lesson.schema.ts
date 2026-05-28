import { z } from "zod";


export const createLessonSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  content: z.string().min(10),

  gradeLevel: z.string(),
  duration: z.coerce.number().min(1),

  objectives: z
    .string()
    .transform((val) => val.split(",").map((v) => v.trim())),

  activities: z
    .string()
    .transform((val) => val.split(",").map((v) => v.trim())),

  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),

  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),

  tags: z
    .string()
    .optional()
    .transform((val) =>
      val ? val.split(",").map((v) => v.trim()) : []
    ),

  unitId: z.string(),
});



export const updateLessonSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  content: z.string().optional(),

  gradeLevel: z.string().optional(),
  duration: z.coerce.number().optional(),

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

  difficulty: z
    .enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
    .optional(),

  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),

  tags: z
    .string()
    .optional()
    .transform((val) =>
      val ? val.split(",").map((v) => v.trim()) : []
    ),

  unitId: z.string().optional(),
});

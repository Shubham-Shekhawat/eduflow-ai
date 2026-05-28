import { z } from "zod";

export const updateSubjectSchema = z.object({
  name: z
    .string()
    .min(2, "Subject name must be at least 3 characters")
    .max(50, "Subject name too long")
    .optional(),

  description: z
    .string()
    .max(500, "Description too long")
    .optional(),
});
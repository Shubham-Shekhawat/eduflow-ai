import { z } from "zod";

export const createSubjectSchema = z.object({
  name: z.string().min(2).max(50),

  description: z.string().max(500).optional(),
});

export type CreateSubjectInput = z.infer<typeof createSubjectSchema>;
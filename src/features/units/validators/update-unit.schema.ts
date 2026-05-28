import * as z from "zod";
 
export const updateUnitSchema = z.object({
  title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title too long"),
  
    description: z
      .string()
      .max(500, "Description too long")
      .optional(),
  
    subjectId: z.string().min(1, "Subject is required"),
});
 
export type UpdateUnitInput =
  z.infer<typeof updateUnitSchema>;
 
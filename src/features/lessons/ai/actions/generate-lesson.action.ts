"use server";
 
import { generateLessonAI } from "../services/lesson-ai.service";
 
export async function generateLessonAction(
  topic: string,
  gradeLevel: string,
  duration: number
) {
  return await generateLessonAI({
    topic,
    gradeLevel,
    duration,
  });
}
 
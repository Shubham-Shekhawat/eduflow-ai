import { groq } from "@ai-sdk/groq";

import { generateText } from "ai";

interface GenerateLessonParams {
  topic: string;

  gradeLevel: string;

  duration: number;
}

export async function generateLessonAI({
  topic,
  gradeLevel,
  duration,
}: GenerateLessonParams) {
  const prompt = `
Generate a structured lesson plan.
 
Topic: ${topic}
Grade Level: ${gradeLevel}
Duration: ${duration} minutes
 
Return JSON format:
 
{
  "title": "",
  "description": "",
  "objectives": [],
  "activities": [],
  "content": "",
  "homework": ""
}
`;

  const { text } = await generateText({
    model: groq("llama-3.3-70b-versatile"),

    prompt,
  });

  function extractJSON(text: string) {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
 
  const jsonString = text.slice(
    firstBrace,
    lastBrace + 1
  );
 
  return JSON.parse(jsonString);
}
 
  // const cleanedText = text
  //   .replace(/```json/g, "")
  //   .replace(/```/g, "")
  //   .trim();

  // return JSON.parse(cleanedText);

  return extractJSON(text);
}

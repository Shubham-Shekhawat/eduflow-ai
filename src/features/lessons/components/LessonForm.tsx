"use client";

import { Lesson, Unit } from "@prisma/client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { generateLessonAction } from "../ai/actions/generate-lesson.action";

import {
  createLessonSchema,
  CreateLessonInput,
  CreateLessonFormInput,
} from "../validators/create-lesson.schema";

import { createLessonAction } from "../actions/create-lesson.action";

import { updateLessonAction } from "../actions/update-lesson.action";
import { useState } from "react";


interface Props {
  lesson?: Lesson;
  units: Unit[];
  onSuccess?: () => void;
}


export default function LessonForm({ lesson, units, onSuccess }: Props) {
  const isEdit = !!lesson;

  const router = useRouter();

  const [isGenerating, setIsGenerating] = useState(false);
  // const [aiTopic, setAiTopic] = useState("");

  // const [aiGrade, setAiGrade] = useState("10");

  // const [aiDuration, setAiDuration] = useState(45);


  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } =
    useForm<CreateLessonFormInput>({
      resolver: zodResolver(createLessonSchema) as any,


      defaultValues: {
        title: lesson?.title || "",
        description: lesson?.description || "",
        content: lesson?.content || "",
        gradeLevel: lesson?.gradeLevel || "",
        duration: lesson?.duration || 30,

        objectives: Array.isArray(lesson?.objectives)
          ? lesson?.objectives.join(", ")
          : "",

        activities: Array.isArray(lesson?.activities)
          ? lesson?.activities.join(", ")
          : "",

        homework: lesson?.homework || "",

        tags: Array.isArray(lesson?.tags)
          ? lesson?.tags.join(", ")
          : "",

        status: lesson?.status || "DRAFT",

        difficulty: lesson?.difficulty || "BEGINNER",

        unitId: lesson?.unitId || "",
      },
    });


  const watchedTitle = watch("title");
  const watchedGrade = watch("gradeLevel");
  const watchedDuration = watch("duration");


  const onSubmit = async (data: CreateLessonFormInput) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value ?? ""));
    });

    try {
      if (lesson?.id) {
        await updateLessonAction(lesson.id, formData);
      } else {
        await createLessonAction(formData);

        reset();
      }

      router.refresh();

      onSuccess?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4 pb-4">
      <input
        {...register("title")}
        placeholder="Lesson Title"
        className="w-full border p-2 rounded"
      />

      <textarea
        {...register("description")}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />

      <textarea
        {...register("content")}
        placeholder="Lesson Content"
        className="w-full border p-2 rounded min-h-[200px]"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          {...register("gradeLevel")}
          placeholder="Grade Level"
          className="border p-2 rounded"
        />

        <input
          type="number"
          {...register("duration")}
          placeholder="Duration"
          className="border p-2 rounded"
        />
      </div>

      <textarea
        {...register("objectives")}
        placeholder="Objectives (comma separated)"
        className="w-full border p-2 rounded"
      />

      <textarea
        {...register("activities")}
        placeholder="Activities (comma separated)"
        className="w-full border p-2 rounded"
      />

      <textarea
        {...register("homework")}
        placeholder="Homework"
        className="w-full border p-2 rounded"
      />

      <input
        {...register("tags")}
        placeholder="Tags (comma separated)"
        className="w-full border p-2 rounded"
      />

      <div className="grid grid-cols-2 gap-4">
        <select {...register("difficulty")} className="border p-2 rounded">
          <option value="BEGINNER">Beginner</option>

          <option value="INTERMEDIATE">Intermediate</option>

          <option value="ADVANCED">Advanced</option>
        </select>

        <select {...register("status")} className="border p-2 rounded">
          <option value="DRAFT">Draft</option>

          <option value="PUBLISHED">Published</option>

          <option value="ARCHIVED">Archived</option>
        </select>
      </div>

      <select
        {...register("unitId", { required: true })}
        className="w-full border p-2 rounded"
      >
        <option value="">Select Unit</option>

        {units.map((unit) => (
          <option key={unit.id} value={unit.id}>
            {unit.title}
          </option>
        ))}
      </select>

      <button
        type="button"
        disabled={isGenerating || !watchedTitle}
        onClick={async () => {
          try {
            setIsGenerating(true);

            const result = await generateLessonAction(
              watchedTitle,
              watchedGrade,
              Number(watchedDuration),
            );

            reset({
              ...result,

              gradeLevel: watchedGrade,

              duration: Number(watchedDuration),

              objectives: result.objectives.join(", "),

              activities: result.activities.join(", "),
            });
          } catch (error) {
            console.error(error);
          } finally {
            setIsGenerating(false);
          }
        }}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
      >
        {isGenerating ? "Generating..." : "✨ Generate with AI"}
      </button>

      <button
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {isSubmitting
          ? "Saving..."
          : isEdit
            ? "Update Lesson"
            : "Create Lesson"}
      </button>
    </div>
  );
}

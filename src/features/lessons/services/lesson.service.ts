import {
  getLessons,
  createLesson,
  updateLesson,
  deleteLesson,
  getLessonById,
} from "@/features/lessons/repositories/lesson.repository";

import { CreateLessonInput } from "@/features/lessons/validators/create-lesson.schema";
import { Lesson } from "@prisma/client";

export const createLessonService = async ({
  data,
  userId,
}: {
  data: CreateLessonInput;
  userId: string;
}) => {
  return createLesson({
    ...data,

    objectives: data.objectives || [],

    activities: data.activities || [],

    tags: data.tags || [],

    authorId: userId,

    aiGenerated: false,
  });
};

export const getLessonsService = async (
  userId: string,
  page: number,
  limit: number,
) => {
  const { data, total } = await getLessons(userId, page, limit);

  console.log("data of get lessons" , data)

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateLessonService = async (
  id: string,
  userId: string,
  data: any,
) => {
  return updateLesson(id, userId, data);
};

export const deleteLessonService = async (id: string, userId: string) => {
  return deleteLesson(id, userId);
};

export const getLessonByIdService = async (id: string): Promise<Lesson> => {
  return getLessonById(id);
};

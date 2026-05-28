import { prisma } from "@/lib/prisma";

export const createLesson = async (data: any) => {
  return prisma.lesson.create({
    data,
  });
};

export const getLessons = async (authorId:string,page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.lesson.findMany({
      skip,
      take: limit,
      where: {
        deletedAt: null, // soft delete check ✅
        authorId, // filter by author
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.lesson.count({
      where: {
        deletedAt: null,
      },
    }),
  ]);

  return { data, total };
};

export const updateLesson = async (id: string, userId: string, data: any) => {
  const existingLesson = await prisma.lesson.findFirst({
    where: {
      id,
      deletedAt: null,
      authorId: userId,
    },
  });

  if (!existingLesson) {
    throw new Error("Lesson not found");
  }

  return prisma.lesson.update({
    where: { id },
    data,
  });
};

export const deleteLesson = async (id: string , userId: string) => {

    const existingLesson = await prisma.lesson.findFirst({
      where:{
        id,
        deletedAt: null,
        authorId: userId,
      }
    });

    if(!existingLesson){
      throw new Error("Lesson not found");
    }


  return prisma.lesson.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

export const getLessonById = async (id: string) => {
  const lesson = await prisma.lesson.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  return lesson;
};

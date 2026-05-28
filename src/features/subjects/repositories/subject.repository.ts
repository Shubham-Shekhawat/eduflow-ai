import { prisma } from "@/lib/prisma";

export const createSubject = async (data: any) => {
  return prisma.subject.create({
    data,
  });
};

export const getSubjects = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.subject.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.subject.count(),
  ]);

  return { data, total };
};

export const updateSubject = async (id: string, data: any) => {
  const existingSubject = await prisma.subject.findFirst({
    where: {
      id,
    },
  });

  if (!existingSubject) {
    throw new Error("Subject not found");
  }

  return prisma.subject.update({
    where: { id },
    data,
  });
};

export const getSubjectById = async (id: string) => {
  const Subject = await prisma.subject.findFirst({
    where: {
      id,
    },
  });

  if (!Subject) {
    throw new Error("Subject not found");
  }

  return Subject;
};

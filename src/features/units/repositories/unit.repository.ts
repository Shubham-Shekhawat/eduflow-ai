import { prisma } from "@/lib/prisma";

export const createUnit = async (data: any) => {
  return prisma.unit.create({
    data,
  });
};

export const getUnits = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.unit.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.unit.count({    }),
  ]);

  return { data, total };
};

export const updateUnit = async (id: string, data: any) => {
  const existingUnit = await prisma.unit.findFirst({
    where: {
      id
    },
  });

  if (!existingUnit) {
    throw new Error("Lesson not found");
  }

  return prisma.unit.update({
    where: { id },
    data,
  });
};

// export const deleteLesson = async (id: string , userId: string) => {

//     const existingLesson = await prisma.lesson.findFirst({
//       where:{
//         id,
//         deletedAt: null,
//         authorId: userId,
//       }
//     });

//     if(!existingLesson){
//       throw new Error("Lesson not found");
//     }


//   return prisma.lesson.update({
//     where: {
//       id,
//     },
//     data: {
//       deletedAt: new Date(),
//     },
//   });
// };

export const getUnitById = async (id: string) => {
  const unit = await prisma.unit.findFirst({
    where: {
      id
    },
  });

  if (!unit) {
    throw new Error("Lesson not found");
  }

  return unit;
};

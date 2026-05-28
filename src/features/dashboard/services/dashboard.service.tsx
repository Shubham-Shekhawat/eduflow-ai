import { prisma } from "@/lib/prisma";
 
export const getDashboardStats = async (userId: string) => {
  const [total, published, draft, recent] =
    await Promise.all([
      prisma.lesson.count({
        where: { authorId: userId, deletedAt: null },
      }),
 
      prisma.lesson.count({
        where: {
          authorId: userId,
          status: "PUBLISHED",
          deletedAt: null,
        },
      }),
 
      prisma.lesson.count({
        where: {
          authorId: userId,
          status: "DRAFT",
          deletedAt: null,
        },
      }),
 
      prisma.lesson.findMany({
        where: {
          authorId: userId,
          deletedAt: null,
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);
 
  return {
    total,
    published,
    draft,
    recent,
  };
};
 
import { prisma } from "@/lib/prisma";


export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = (data: any) => {
  return prisma.user.create({
    data,
  });
};

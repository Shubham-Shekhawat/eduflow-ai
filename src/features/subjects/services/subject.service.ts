
import { getSubjects , createSubject , updateSubject ,getSubjectById } from "../repositories/subject.repository";

import { Subject } from "@prisma/client";

import { CreateSubjectInput } from "../validators/create-subject.schema";

export const createSubjectService = async ({
  data,
}: {
  data: CreateSubjectInput;
}) => {
  return createSubject({
  ...data});
 
};

export const getSubjectsService = async (
  page: number,
  limit: number,
) => {
  const { data, total } = await getSubjects( page, limit);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateSubjectsService = async (
  id: string,
  data: any,
) => {
  return updateSubject(id, data);
};


export const getSubjectByIdService = async (id: string): Promise<Subject> => {
  return getSubjectById(id);
};

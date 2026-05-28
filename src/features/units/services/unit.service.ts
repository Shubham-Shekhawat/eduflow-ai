

import { Unit } from "@prisma/client";
import { getUnits , getUnitById , createUnit , updateUnit } from "../repositories/unit.repository";

import { CreateUnitInput } from "../validators/create-unit.schema";

export const createUnitService = async ({
  data,
}: {
  data: CreateUnitInput;
}) => {
  return createUnit({
  ...data});
 
};

export const getUnitsService = async (
  page: number,
  limit: number,
) => {
  console.log("get units services called")
  const { data, total } = await getUnits( page, limit);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const updateUnitService = async (
  id: string,
  data: any,
) => {
  return updateUnit(id, data);
};


export const getUnitByIdService = async (id: string): Promise<Unit> => {
  return getUnitById(id);
};

import { NextFunction } from "express";
import { User } from "../models/index";
import createHttpError from "http-errors";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkCompanyAccess = async (user: User, model: any, modelId: number, next: NextFunction) => {
  const value = await model.findByPk(modelId, {
    attributes: ["carrier_id"],
  });

  if (!value) next(createHttpError(404, `Model '${model.tableName}' with id ${modelId} not found`));

  if (value.carrier_id !== user.company_id) {
    next(createHttpError(400, `${model.tableName} Does not belong to the company with id ${user.company_id}`));
  }

  return value;
};

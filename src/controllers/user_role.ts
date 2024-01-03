import { Request, Response, NextFunction } from "express";

import { userRoleValidator } from "../validators";
import { userRoleService } from "../services";
import { HttpError } from "../utils";


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = userRoleValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.company_id = req.user.company_id;

    const { id } = await userRoleService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = userRoleValidator.delete.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<userRoleService.WhereOne> = {
      where: {
        id: params.user_role_id,
        company_id: req.user.company_id
      }
    };

    const count = await userRoleService.remove(query);
    if(count === 0) throw HttpError.notFound("UserRole");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
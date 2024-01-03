import { Request, Response, NextFunction } from "express";

import { permissionValidator } from "../validators";
import { permissionService } from "../services";
import { HttpError } from "../utils";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = permissionValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);
    
    const { id } = await permissionService.create(payload, {});

    res.status(200).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = permissionValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = permissionValidator.update.params.validate(req.params);
    
    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<permissionService.WhereOne> = {
      where: {
        id: params.permission_id,
        company_id: req.user.company_id
      }
    };

    const count = await permissionService.update(payload, query);
    if(count === 0) throw HttpError.notFound("Permission");

    res.status(200).json({ message: `permission with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = permissionValidator.delete.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<permissionService.WhereOne> = {
      where: {
        id: params.permission_id,
        company_id: req.user.company_id
      }
    };

    const count = await permissionService.remove(query);
    if(count === 0) throw HttpError.notFound("Permission");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
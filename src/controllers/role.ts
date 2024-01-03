import { Request, Response, NextFunction } from "express";

import { roleValidator } from "../validators";
import { permissionService, roleService } from "../services";
import { HttpError } from "../utils";
import { sequelize } from "../configs";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = roleValidator.many.query.validate(req.query);
    if(error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;
        
    where.company_id = req.user.company_id;

    const query: Query<roleService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const roles = await roleService.many(query);
    const count = await roleService.count(query);
        
    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: roles
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = roleValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<roleService.WhereOne> = {
      where: {
        id: params.role_id,
        company_id: req.user.company_id
      }
    };

    const role = await roleService.one(query);
    if(!role) throw HttpError.notFound("Role");
     
    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  let is_committed = false;
  try {
    const { error, value: p } = roleValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    const { permissions, ...payload } = p;

    payload.company_id = req.user.company_id;

    const { id } = await roleService.create(payload, { transaction });

    for(const permission of permissions) {
      permission.role_id = id;
      permission.company_id = req.user.company_id;
      await permissionService.create(permission, { transaction });
    }

    await transaction.commit();
    is_committed = true;
    res.status(201).json({ id });
  } catch (error) {
    if(!is_committed) await transaction.rollback();
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = roleValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = roleValidator.update.params.validate(req.params);
    
    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<roleService.WhereOne> = {
      where: {
        id: params.role_id,
        company_id: req.user.company_id
      }
    };

    const count = await roleService.update(payload, query);
    if(count === 0) throw HttpError.notFound("Role");

    res.status(200).json({ message: `role with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = roleValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<roleService.WhereOne> = {
      where: {
        id: params.role_id,
        company_id: req.user.company_id
      }
    };

    const count = await roleService.remove(query);
    if(count === 0) throw HttpError.notFound("Role");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
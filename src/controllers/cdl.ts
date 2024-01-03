import { Request, Response, NextFunction } from "express";

import { cdlValidator } from "../validators";
import { cdlService } from "../services";
import { HttpError } from "../utils";


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = cdlValidator.create.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const { error, value: payload } = cdlValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    const now = new Date();
    const expiration_date = new Date(payload.expiration_date);

    if(now.getTime() >= expiration_date.getTime()) throw HttpError.badRequest("Expiration date is not valid");

    payload.driver_id = params.driver_id;
    payload.carrier_id = req.user.company_id;
    payload.user_id = req.user.id;

    const { id } = await cdlService.create(payload, {});

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = cdlValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = cdlValidator.update.params.validate(req.params);
    
    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<cdlService.WhereOne> = {
      where: {
        id: params.cdl_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await cdlService.update(payload, query);
    if(count === 0) throw HttpError.notFound("Cdl");

    res.status(200).json({ message: `cdl with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = cdlValidator.delete.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<cdlService.WhereOne> = {
      where: {
        id: params.cdl_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await cdlService.remove(query);
    if(count === 0) throw HttpError.notFound("Cdl");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
import { Request, Response, NextFunction } from "express";

import { bcarrierValidator } from "../validators";
import { bcarrierService } from "../services";
import { HttpError } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = bcarrierValidator.many.query.validate(req.query);
    if(error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;
        
    where.broker_id = req.user.company_id;

    const query: Query<bcarrierService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const bcarriers = await bcarrierService.many(query);
    const count = await bcarrierService.count(query);
        
    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: bcarriers
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = bcarrierValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<bcarrierService.WhereOne> = {
      where: {
        id: params.bcarrier_id,
        broker_id: req.user.company_id
      }
    };

    const bcarrier = await bcarrierService.one(query);
    if(!bcarrier) throw HttpError.notFound("BCarrier");
     
    res.status(200).json(bcarrier);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = bcarrierValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.broker_id = req.user.company_id;

    const { id } = await bcarrierService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = bcarrierValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = bcarrierValidator.update.params.validate(req.params);
    
    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<bcarrierService.WhereOne> = {
      where: {
        id: params.bcarrier_id,
        broker_id: req.user.company_id
      }
    };

    const count = await bcarrierService.update(payload, query);
    if(count === 0) throw HttpError.notFound("BCarrier");

    res.status(200).json({ message: `bcarrier with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = bcarrierValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<bcarrierService.WhereOne> = {
      where: {
        id: params.bcarrier_id,
        broker_id: req.user.company_id
      }
    };

    const count = await bcarrierService.remove(query);
    if(count === 0) throw HttpError.notFound("BCarrier");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
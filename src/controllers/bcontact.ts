import { Request, Response, NextFunction } from "express";

import { bcontactValidator } from "../validators";
import { bcontactService } from "../services";
import { HttpError } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = bcontactValidator.many.query.validate(req.query);
    if(error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;
        
    where.broker_id = req.user.company_id;

    const query: Query<bcontactService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const bcontacts = await bcontactService.many(query);
    const count = await bcontactService.count(query);
        
    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: bcontacts
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = bcontactValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<bcontactService.WhereOne> = {
      where: {
        id: params.bcontact_id,
        broker_id: req.user.company_id
      }
    };

    const bcontact = await bcontactService.one(query);
    if(!bcontact) throw HttpError.notFound("BContact");
     
    res.status(200).json(bcontact);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = bcontactValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.broker_id = req.user.company_id;

    const { id } = await bcontactService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = bcontactValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = bcontactValidator.update.params.validate(req.params);
    
    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<bcontactService.WhereOne> = {
      where: {
        id: params.bcontact_id,
        broker_id: req.user.company_id
      }
    };

    const count = await bcontactService.update(payload, query);
    if(count === 0) throw HttpError.notFound("BContact");

    res.status(200).json({ message: `bcontact with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = bcontactValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<bcontactService.WhereOne> = {
      where: {
        id: params.bcontact_id,
        broker_id: req.user.company_id
      }
    };

    const count = await bcontactService.remove(query);
    if(count === 0) throw HttpError.notFound("BContact");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
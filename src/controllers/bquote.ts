import { Request, Response, NextFunction } from "express";

import { bquoteValidator } from "../validators";
import { bquoteService } from "../services";
import { HttpError } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = bquoteValidator.many.query.validate(req.query);
    if(error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;
        
    where.broker_id = 6;

    const query: Query<bquoteService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const bquotes = await bquoteService.many(query);
    const count = await bquoteService.count(query);
        
    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: bquotes
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = bquoteValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<bquoteService.WhereOne> = {
      where: {
        id: params.bquote_id,
        broker_id: req.user.company_id
      }
    };

    const bquote = await bquoteService.one(query);
    if(!bquote) throw HttpError.notFound("BQuote");
     
    res.status(200).json(bquote);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = bquoteValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.broker_id = 6;

    const { id } = await bquoteService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = bquoteValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = bquoteValidator.update.params.validate(req.params);
    
    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<bquoteService.WhereOne> = {
      where: {
        id: params.bquote_id,
        broker_id: req.user.company_id
      }
    };

    const count = await bquoteService.update(payload, query);
    if(count === 0) throw HttpError.notFound("BQuote");

    res.status(200).json({ message: `bquote with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = bquoteValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<bquoteService.WhereOne> = {
      where: {
        id: params.bquote_id,
        broker_id: req.user.company_id
      }
    };

    const count = await bquoteService.remove(query);
    if(count === 0) throw HttpError.notFound("BQuote");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
import { Request, Response, NextFunction } from "express";

import { binvoiceValidator } from "../validators";
import { binvoiceService } from "../services";
import { HttpError } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = binvoiceValidator.many.query.validate(req.query);
    if(error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;
        
    where.broker_id = req.user.company_id;

    const query: Query<binvoiceService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const binvoices = await binvoiceService.many(query);
    const count = await binvoiceService.count(query);
        
    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: binvoices
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = binvoiceValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<binvoiceService.WhereOne> = {
      where: {
        id: params.binvoice_id,
        broker_id: req.user.company_id
      }
    };

    const binvoice = await binvoiceService.one(query);
    if(!binvoice) throw HttpError.notFound("BInvoice");
     
    res.status(200).json(binvoice);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = binvoiceValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.broker_id = req.user.company_id;

    const { id } = await binvoiceService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = binvoiceValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = binvoiceValidator.update.params.validate(req.params);
    
    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<binvoiceService.WhereOne> = {
      where: {
        id: params.binvoice_id,
        broker_id: req.user.company_id
      }
    };

    const count = await binvoiceService.update(payload, query);
    if(count === 0) throw HttpError.notFound("BInvoice");

    res.status(200).json({ message: `binvoice with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = binvoiceValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<binvoiceService.WhereOne> = {
      where: {
        id: params.binvoice_id,
        broker_id: req.user.company_id
      }
    };

    const count = await binvoiceService.remove(query);
    if(count === 0) throw HttpError.notFound("BInvoice");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
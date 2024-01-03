import { Request, Response, NextFunction } from "express";

import { vendorValidator } from "../validators";
import { vendorService } from "../services";
import { HttpError } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = vendorValidator.many.query.validate(req.query);
    if(error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;
        
    where.carrier_id = req.user.company_id;

    const query: Query<vendorService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const vendors = await vendorService.many(query);
    const count = await vendorService.count(query);
        
    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: vendors
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = vendorValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<vendorService.WhereOne> = {
      where: {
        id: params.vendor_id,
        carrier_id: req.user.company_id
      }
    };

    const vendor = await vendorService.one(query);
    if(!vendor) throw HttpError.notFound("Vendor");
     
    res.status(200).json(vendor);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = vendorValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    const { id } = await vendorService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = vendorValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = vendorValidator.update.params.validate(req.params);
    
    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<vendorService.WhereOne> = {
      where: {
        id: params.vendor_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await vendorService.update(payload, query);
    if(count === 0) throw HttpError.notFound("Vendor");

    res.status(200).json({ message: `vendor with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = vendorValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<vendorService.WhereOne> = {
      where: {
        id: params.vendor_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await vendorService.remove(query);
    if(count === 0) throw HttpError.notFound("Vendor");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
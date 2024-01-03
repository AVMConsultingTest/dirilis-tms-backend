import { Request, Response, NextFunction } from "express";

import { checkinCheckoutValidator } from "../validators";
import { checkinCheckoutService } from "../services";
import { HttpError } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = checkinCheckoutValidator.many.query.validate(req.query);
    if(error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;
        
    where.carrier_id = req.user.company_id;

    const query: Query<checkinCheckoutService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const checkinCheckouts = await checkinCheckoutService.many(query);
    const count = await checkinCheckoutService.count(query);
        
    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: checkinCheckouts
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = checkinCheckoutValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<checkinCheckoutService.WhereOne> = {
      where: {
        id: params.checkin_checkout_id,
        carrier_id: req.user.company_id
      }
    };

    const checkinCheckout = await checkinCheckoutService.one(query);
    if(!checkinCheckout) throw HttpError.notFound("CheckinCheckout");
     
    res.status(200).json(checkinCheckout);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = checkinCheckoutValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    const { id } = await checkinCheckoutService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = checkinCheckoutValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = checkinCheckoutValidator.update.params.validate(req.params);
    
    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<checkinCheckoutService.WhereOne> = {
      where: {
        id: params.checkin_checkout_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await checkinCheckoutService.update(payload, query);
    if(count === 0) throw HttpError.notFound("CheckinCheckout");

    res.status(200).json({ message: `checkinCheckout with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = checkinCheckoutValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<checkinCheckoutService.WhereOne> = {
      where: {
        id: params.checkin_checkout_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await checkinCheckoutService.remove(query);
    if(count === 0) throw HttpError.notFound("CheckinCheckout");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
import { Request, Response, NextFunction } from "express";

import { brokerValidator } from "../validators";
import { brokerService } from "../services";
import { HttpError } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = brokerValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<brokerService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const brokers = await brokerService.many(query);
    const count = await brokerService.count(query);

    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: brokers
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = brokerValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<brokerService.WhereOne> = {
      where: {
        id: params.broker_id,
        carrier_id: req.user.company_id
      }
    };

    const broker = await brokerService.one(query);
    if (!broker) throw HttpError.notFound("Broker");

    res.status(200).json(broker);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = brokerValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    const { id } = await brokerService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = brokerValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = brokerValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<brokerService.WhereOne> = {
      where: {
        id: params.broker_id,
        carrier_id: req.user.company_id
      }
    };


    const count = await brokerService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Broker");

    res.status(200).json({ message: `broker with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = brokerValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<brokerService.WhereOne> = {
      where: {
        id: params.broker_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await brokerService.remove(query);
    if (count === 0) throw HttpError.notFound("Broker");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
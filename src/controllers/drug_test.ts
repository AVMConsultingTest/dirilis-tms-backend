import { Request, Response, NextFunction } from "express";

import { drugTestValidator } from "../validators";
import { drugTestService } from "../services";
import { HttpError } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = drugTestValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<drugTestService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const drugTests = await drugTestService.many(query);
    const count = await drugTestService.count(query);

    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: drugTests
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = drugTestValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<drugTestService.WhereOne> = {
      where: {
        id: params.drug_test_id,
        carrier_id: req.user.company_id
      }
    };

    const drugTest = await drugTestService.one(query);
    if (!drugTest) throw HttpError.notFound("Drug Test");

    res.status(200).json(drugTest);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = drugTestValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    const { id } = await drugTestService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = drugTestValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = drugTestValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<drugTestService.WhereOne> = {
      where: {
        id: params.drug_test_id,
        carrier_id: req.user.company_id
      }
    };


    const count = await drugTestService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Drug Test");

    res.status(200).json({ message: `drugTest with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = drugTestValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<drugTestService.WhereOne> = {
      where: {
        id: params.drug_test_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await drugTestService.remove(query);
    if (count === 0) throw HttpError.notFound("Drug Test");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
import { Request, Response, NextFunction } from "express";

import { trainingValidator } from "../validators";
import { trainingService } from "../services";
import { HttpError } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = trainingValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<trainingService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const trainings = await trainingService.many(query);
    const count = await trainingService.count(query);

    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: trainings
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = trainingValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<trainingService.WhereOne> = {
      where: {
        id: params.training_id,
        carrier_id: req.user.company_id
      }
    };

    const training = await trainingService.one(query);
    if (!training) throw HttpError.notFound("Training");

    res.status(200).json(training);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = trainingValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    const { id } = await trainingService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = trainingValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = trainingValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<trainingService.WhereOne> = {
      where: {
        id: params.training_id,
        carrier_id: req.user.company_id
      }
    };


    const count = await trainingService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Training");

    res.status(200).json({ message: `training with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = trainingValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<trainingService.WhereOne> = {
      where: {
        id: params.training_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await trainingService.remove(query);
    if (count === 0) throw HttpError.notFound("Training");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const searchByDriverId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = trainingValidator.search.query.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<trainingService.WhereMany> = {
      where: {
        driver_id: params.driver_id,
        carrier_id: req.user.company_id
      }
    };

    const training = await trainingService.searchById(query);
    if (!training) throw HttpError.notFound("Training");

    res.status(200).json(training);
  } catch (error) {
    next(error);
  }
};
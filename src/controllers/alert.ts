import { Request, Response, NextFunction } from "express";

import { alertValidator } from "../validators";
import { alertService, trainingService } from "../services";
import { ETrainingStatus } from "../types";
import { HttpError } from "../utils";
import { User } from "../models";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = alertValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<alertService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const alerts = await alertService.many(query);
    const count = await alertService.count(query);

    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: alerts
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = alertValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<alertService.WhereOne> = {
      where: {
        id: params.alert_id,
        carrier_id: req.user.company_id
      }
    };

    const alert = await alertService.one(query);
    if (!alert) throw HttpError.notFound("Alert");

    res.status(200).json(alert);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = alertValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    const { id } = await alertService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    (error);
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = alertValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = alertValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<alertService.WhereOne> = {
      where: {
        id: params.alert_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await alertService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Alert");

    res.status(200).json({ message: `alert with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = alertValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<alertService.WhereOne> = {
      where: {
        id: params.alert_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await alertService.remove(query);
    if (count === 0) throw HttpError.notFound("Alert");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const summary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get the user id from the request
    const user = req.user;
    
    const incomplete_trainings = await trainingService.count({
      where: {
        carrier_id: user.company_id,
        status: ETrainingStatus.Pending
      }
    });

    res.status(200).json({
      new_inspections: 1,
      outstanding_dvers: 1,
      telematic_alerts: 1,
      incomplete_trainings,
    });

  } catch (error) {
    (error);
    next(error);
  }
};
import { Request, Response, NextFunction } from "express";

import { inspectionValidator } from "../validators";
import { inspectionService } from "../services";
import { HttpError } from "../utils";
import { User } from "../models";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = inspectionValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<inspectionService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const inspections = await inspectionService.many(query);
    const count = await inspectionService.count(query);

    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: inspections
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = inspectionValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<inspectionService.WhereOne> = {
      where: {
        id: params.inspection_id,
        carrier_id: req.user.company_id
      }
    };

    const inspection = await inspectionService.one(query);
    if (!inspection) throw HttpError.notFound("Inspection");

    res.status(200).json(inspection);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = inspectionValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    const { id } = await inspectionService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = inspectionValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = inspectionValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<inspectionService.WhereOne> = {
      where: {
        id: params.inspection_id,
        carrier_id: req.user.company_id
      }
    };


    const count = await inspectionService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Inspection");

    res.status(200).json({ message: `inspection with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = inspectionValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<inspectionService.WhereOne> = {
      where: {
        id: params.inspection_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await inspectionService.remove(query);
    if (count === 0) throw HttpError.notFound("Inspection");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getViolationPointsSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get the user id from the request
    const userId = req.user.id;

    // get the user's company
    const user = await User.findByPk(userId, { attributes: ["company_id"] });
    if (!user || !user.company_id) throw HttpError.forbidden("User must belong to a company to view trailers summary");

    res.status(200).json({
      failing_points: 10,
      new_points: 22
    });
  } catch (error) {
    (error);
    next(error);
  }
};

export const getviolationPointsChangesSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get the user id from the request
    const userId = req.user.id;

    // get the user's company
    const user = await User.findByPk(userId, { attributes: ["company_id"] });
    if (!user || !user.company_id) throw HttpError.forbidden("User must belong to a company to view violation points summary");

    res.status(200).json([{
      unsafe_driver: {
        falling_point: 10,
        new_point: 14,
        impact: "medium"
      },
      driver_fitness: {
        falling_point: 20,
        new_point: 24,
        impact: "medium"
      },
      subtance_alcohol: {
        falling_point: 28,
        new_point: 22,
        impact: "medium"
      },
      crash_indicator: {
        falling_point: 42,
        new_point: 19,
        impact: "medium"
      },
      hos_compliance: {
        falling_point: 40,
        new_point: 40,
        impact: "medium"
      },
      vehicle_maintanence: {
        falling_point: 32,
        new_point: 10,
        impact: "medium"
      },
      hm_compliance: {
        falling_point: 12,
        new_point: 30,
        impact: "medium"
      }
    }]);
  } catch (error) {
    (error);
    next(error);
  }
};
import { Request, Response, NextFunction } from "express";
import sequelize, { Op } from "sequelize";

import { permitValidator } from "../validators";
import { permitService } from "../services";
import { HttpError } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = permitValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<permitService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const permits = await permitService.many(query);
    const count = await permitService.count(query);

    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: permits
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = permitValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<permitService.WhereOne> = {
      where: {
        id: params.permit_id,
        carrier_id: req.user.company_id
      }
    };

    const permit = await permitService.one(query);
    if (!permit) throw HttpError.notFound("Permit");

    res.status(200).json(permit);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = permitValidator.create.body.validate(req.body);
    if (error) HttpError.badRequest(error.message);

    const start_date = new Date(payload.start_date);
    const end_date = new Date(payload.end_date);
    const duration = Math.ceil((end_date.getTime() - start_date.getTime()) / (1000 * 60 * 60 * 24));

    payload.duration = `${duration} days`;
    payload.carrier_id = req.user.company_id;

    const { id } = await permitService.create(payload);

    res.status(201).json({ id });

  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = permitValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = permitValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) HttpError.badRequest(paramsError.message);

    const query: Query<permitService.WhereOne> = {
      where: {
        id: params.permit_id,
        carrier_id: req.user.company_id
      }
    };

    if (payload.start_date || payload.end_date) {
      const permit = await permitService.one(query);
      if (!permit) throw HttpError.notFound("Permit");

      const start_date = new Date(payload.start_date || permit.start_date);
      const end_date = new Date(payload.end_date || permit.end_date);
      const duration = Math.ceil((end_date.getTime() - start_date.getTime()) / (1000 * 60 * 60 * 24));
      payload.duration = `${duration} days`;
    }

    const count = await permitService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Permit");

    res.status(200).json({ message: `Permit with id ${params.permit_id} updated successfully` });
  } catch (error) {
    next(error);
  }

};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = permitValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<permitService.WhereOne> = {
      where: {
        id: params.permit_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await permitService.remove(query);
    if (count === 0) throw HttpError.notFound("Permit");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const expiringSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const now = new Date();
    const start_date = new Date();
    const end_date = new Date();
    end_date.setDate(now.getDate() + 30); // Add 30 days to the current date

    start_date.setHours(0, 0, 0, 0);
    end_date.setHours(0, 0, 0, 0);

    const permits = await permitService.expiringSummary({
      where: {
        end_date: {
          [Op.between]: [start_date, end_date],
        },
        carrier_id: req.user.company_id
      },
      attributes: [
        "type",
        [sequelize.fn("COUNT", sequelize.col("id")), "expiring_count"]
      ],
      group: ["type"],
    });


    const data = permitService.summaryAsObject(permits);

    return res.json(data);
  } catch (error) {
    next(error);
  }
};
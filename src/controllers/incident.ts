import { Request, Response, NextFunction } from "express";

import { incidentValidator } from "../validators";
import { incidentService } from "../services";
import { HttpError, flattenObject } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = incidentValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<incidentService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const incidents = await incidentService.many(query);
    const count = await incidentService.count(query);

    const total_pages = Math.ceil(count / query.page_size);
    const data = flattenObject(incidents);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = incidentValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<incidentService.WhereOne> = {
      where: {
        id: params.incident_id,
        carrier_id: req.user.company_id
      }
    };

    const incident = await incidentService.one(query);
    if (!incident) throw HttpError.notFound("Incident");

    const data = flattenObject(incident);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = incidentValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    const { id } = await incidentService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = incidentValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = incidentValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<incidentService.WhereOne> = {
      where: {
        id: params.incident_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await incidentService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Incident");

    res.status(200).json({ message: `incident with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = incidentValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<incidentService.WhereOne> = {
      where: {
        id: params.incident_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await incidentService.remove(query);
    if (count === 0) throw HttpError.notFound("Incident");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
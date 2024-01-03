import { Request, Response, NextFunction } from "express";

import { locationValidator } from "../validators";
import { locationService } from "../services";
import { HttpError } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = locationValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<locationService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const locations = await locationService.many(query);
    const count = await locationService.count(query);

    const total_pages = Math.ceil(count / query.page_size);
        

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: locations
    });

  } catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = locationValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<locationService.WhereOne> = {
      where: {
        id: params.location_id,
        carrier_id: req.user.company_id
      }
    };

    const location = await locationService.one(query);
    if (!location) throw HttpError.notFound("Location");

    res.status(200).json(location);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = locationValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    const { id } = await locationService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = locationValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = locationValidator.update.params.validate(req.params);
  
    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);
  
    const query: Query<locationService.WhereOne> = {
      where: {
        id: params.location_id,
        carrier_id: req.user.company_id
      }
    };
  
    const count = await locationService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Accident");
  
    res.status(200).json({ message: `accident with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};
  
export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = locationValidator.delete.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<locationService.WhereOne> = {
      where: {
        id: params.location_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await locationService.remove(query);
    if (count === 0) throw HttpError.notFound("Location");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const searchByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = locationValidator.searchByName.query.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<locationService.WhereMany> = {
      where: {
        name: params.location_name,
        carrier_id: req.user.company_id
      }
    };

    const location = await locationService.searchByName(query);
    if (!location) throw HttpError.notFound("Location");

    res.status(200).json(location);
  } catch (error) {
    next(error);
  }
};
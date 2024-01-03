import { Request, Response, NextFunction } from "express";

import { truckValidator } from "../validators";
import { truckService } from "../services";
import { HttpError, flattenObject, xslx } from "../utils";
import { ITruckCreate } from "../models";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = truckValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<truckService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const trucks = await truckService.many(query);
    const count = await truckService.count(query);

    const total_pages = Math.ceil(count / query.page_size);
    const data = flattenObject(trucks);

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
    const { error: paramsError, value: params } = truckValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<truckService.WhereOne> = {
      where: {
        id: params.truck_id,
        carrier_id: req.user.company_id
      }
    };

    const truck = await truckService.one(query);
    if (!truck) throw HttpError.notFound("Truck");

    const data = flattenObject(truck);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate that no query parameters are provided
    if (Object.keys(req.query).length > 0) {
      throw HttpError.badRequest("No query parameters allowed for this endpoint.");
    }

    const trucks = await truckService.all({ where: { carrier_id: req.user.company_id } });

    res.status(200).json({ data: trucks });
  }
  catch (error) {
    next(error);
  }
};

export const createMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    if(!file) throw HttpError.badRequest("Excel file is required");

    const data = xslx.parse(file.buffer) as ITruckCreate[];

    for(let i = 0; i < data.length; i++) {
      const item = data[i];

      const { error } = truckValidator.create.body.validate(item);
      if (error) throw HttpError.badRequest(`Row ${i + 2}: ${error.message}`);
    }

    for(const item of data) {
      item.carrier_id = req.user.company_id;
      await truckService.create(item);
    }


    res.status(200).json({  message: "Trucks created successfully" });
  } catch(error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = truckValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    const { id } = await truckService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = truckValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = truckValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<truckService.WhereOne> = {
      where: {
        id: params.truck_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await truckService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Truck");

    res.status(200).json({ message: `truck with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = truckValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<truckService.WhereOne> = {
      where: {
        id: params.truck_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await truckService.remove(query);
    if (count === 0) throw HttpError.notFound("Truck");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
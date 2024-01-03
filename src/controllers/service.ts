import { Request, Response, NextFunction } from "express";

import { serviceValidator } from "../validators";
import { serviceService } from "../services";
import { HttpError, flattenObject } from "../utils";

export const getSummary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const servicesSummary = await serviceService.expiringSummary({
      where: {
        carrier_id: req.user.company_id
      }
    });

    const data = serviceService.getSummaryAsObject(servicesSummary);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = serviceValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<serviceService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const services = await serviceService.many(query);

    serviceService.toVehicle(services);

    const count = await serviceService.count(query);
    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: flattenObject(services)
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = serviceValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<serviceService.WhereOne> = {
      where: {
        id: params.service_id,
        carrier_id: req.user.company_id
      }
    };

    const service = await serviceService.one(query);
    if (!service) throw HttpError.notFound("Service");

    serviceService.toVehicle(service);

    res.status(200).json(flattenObject(service));
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = serviceValidator.create.body.validate(req.body);
    if (error) HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    serviceService.fromVehicle(payload);

    const { id } = await serviceService.create(payload);

    res.status(201).json({ id });

  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = serviceValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = serviceValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) HttpError.badRequest(paramsError.message);

    serviceService.fromVehicle(payload);

    const query: Query<serviceService.WhereOne> = {
      where: {
        id: params.service_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await serviceService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Service");

    res.status(200).json({ message: `Service with id ${params.service_id} updated successfully` });
  } catch (error) {
    next(error);
  }

};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = serviceValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<serviceService.WhereOne> = {
      where: {
        id: params.service_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await serviceService.remove(query);
    if (count === 0) throw HttpError.notFound("Service");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
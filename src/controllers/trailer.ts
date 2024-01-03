import { Request, Response, NextFunction } from "express";

import { trailerValidator } from "../validators";
import { trailerService } from "../services";
import { HttpError, xslx } from "../utils";
import { ITrailerCreate } from "../models";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = trailerValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<trailerService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const trailers = await trailerService.many(query);
    const count = await trailerService.count(query);

    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: trailers
    });
  }
  catch (error) {
    next(error);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate that no query parameters are provided
    if (Object.keys(req.query).length > 0) {
      throw HttpError.badRequest("No query parameters allowed for this endpoint.");
    }

    const trailers = await trailerService.all({ where: { carrier_id: req.user.company_id } });

    res.status(200).json({ data: trailers });
  }
  catch (error) {
    next(error);
  }
};  

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = trailerValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<trailerService.WhereOne> = {
      where: {
        id: params.trailer_id,
        carrier_id: req.user.company_id
      }
    };

    const trailer = await trailerService.one(query);
    if (!trailer) throw HttpError.notFound("Trailer");

    res.status(200).json(trailer);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = trailerValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    const { id } = await trailerService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const createMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file;
    if(!file) throw HttpError.badRequest("Excel file is required");

    const data = xslx.parse(file.buffer) as ITrailerCreate[];

    for(let i = 0; i < data.length; i++) {
      const item = data[i];

      const { error } = trailerValidator.create.body.validate(item);
      if (error) throw HttpError.badRequest(`Row ${i + 2}: ${error.message}`);
    }

    for(const item of data) {
      item.carrier_id = req.user.company_id;
      await trailerService.create(item);
    }


    res.status(200).json({  message: "Trailers created successfully" });
  } catch(error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = trailerValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = trailerValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<trailerService.WhereOne> = {
      where: {
        id: params.trailer_id,
        carrier_id: req.user.company_id
      }
    };


    const count = await trailerService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Trailer");

    res.status(200).json({ message: `trailer with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = trailerValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<trailerService.WhereOne> = {
      where: {
        id: params.trailer_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await trailerService.remove(query);
    if (count === 0) throw HttpError.notFound("Trailer");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
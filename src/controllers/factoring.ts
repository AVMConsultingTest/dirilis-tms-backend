import { Request, Response, NextFunction } from "express";

import { factoringValidator } from "../validators";
import { factoringService } from "../services";
import { HttpError, csv } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = factoringValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<factoringService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const factorings = await factoringService.many(query);
    const count = await factoringService.count(query);

    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: factorings
    });
  }
  catch (error) {
    next(error);
  }
};

export const sendOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = factoringValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<factoringService.WhereOne> = {
      where: {
        id: params.factoring_id,
        carrier_id: req.user.company_id
      }
    };

    const factoring = await factoringService.one(query);
    if (!factoring) throw HttpError.notFound("Factoring");

    const tmsObject = factoringService.toTMSObject(factoring);
    const csvStream = csv.toStream(tmsObject);
    const csvString = await csv.toString(csvStream);

    console.log(csvString);

    return res.json({ message: "Factoring sent successfully" });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = factoringValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<factoringService.WhereOne> = {
      where: {
        id: params.factoring_id,
        carrier_id: req.user.company_id
      }
    };

    const factoring = await factoringService.one(query);
    if (!factoring) throw HttpError.notFound("Factoring");

    res.status(200).json(factoring);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = factoringValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    const { id } = await factoringService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = factoringValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = factoringValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<factoringService.WhereOne> = {
      where: {
        id: params.factoring_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await factoringService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Factoring");

    res.status(200).json({ message: `factoring with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = factoringValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<factoringService.WhereOne> = {
      where: {
        id: params.factoring_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await factoringService.remove(query);
    if (count === 0) throw HttpError.notFound("Factoring");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
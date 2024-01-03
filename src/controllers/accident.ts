import { Request, Response, NextFunction } from "express";

import { accidentValidator } from "../validators";
import { accidentService } from "../services";
import { HttpError, flattenObject } from "../utils";
import axios from "axios";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = accidentValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<accidentService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const accidents = await accidentService.many(query);
    const count = await accidentService.count(query);

    const total_pages = Math.ceil(count / query.page_size);
    const data = flattenObject(accidents);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data
    });
  }
  catch (error) {
    console.log(error);
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = accidentValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<accidentService.WhereOne> = {
      where: {
        id: params.accident_id,
        carrier_id: req.user.company_id
      }
    };

    const accident = await accidentService.one(query);
    if (!accident) throw HttpError.notFound("Accident");

    const data = flattenObject(accident);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = accidentValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    const { id } = await accidentService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = accidentValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = accidentValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<accidentService.WhereOne> = {
      where: {
        id: params.accident_id,
        carrier_id: req.user.company_id
      }
    };


    const count = await accidentService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Accident");

    res.status(200).json({ message: `accident with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = accidentValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<accidentService.WhereOne> = {
      where: {
        id: params.accident_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await accidentService.remove(query);
    if (count === 0) throw HttpError.notFound("Accident");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getAccidensFromSamba = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // send request to samba
    // get data
    // save data to db
    // return data
    const username = process.env.SAMBA_USERNAME;
    const password = process.env.SAMBA_PASSWORD;
    const dotNumber = 3003070;
    const URL = process.env.SAMBA_URL;
    const authParameter = Buffer.from(`${username}:${password}`).toString("base64");

    

    const data = await axios.get(URL, {
      headers: {
        Authorization: `Basic ${authParameter}`
      },
      params: {
        dotNumber
      }
    });

    console.log(data.data);
    // const modifiedData = data.data.map((item: any) => {
    //   return {
    //     carrier_id: req.user.company_id,
    //     date: item.inspectionDate,
    //     location: item.inspectionLocation,
    //     driver: item.driverName,
    //     violation: item.violation,
    //     violation_type: item.violationType,
    //     violation_category: item.violationCategory,
    //     violation_code: item.violationCode,
    //     violation_description: item.violationDescription,
    //     violation_points: item.violationPoints,
    //     violation_fine: item.violationFine,
    //     violation_csa_score: item.violationCSAScore,
    //     violation_csa_severity: item.violationCSASeverity,
    //   };
    // });



    res.status(200).json("hellop");
  } catch (error) {
    next(error);
  }
};
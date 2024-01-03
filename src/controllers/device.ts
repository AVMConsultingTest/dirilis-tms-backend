import { Request, Response, NextFunction } from "express";
import sequelize from "sequelize";

import { deviceValidator } from "../validators";
import { deviceService } from "../services";
import { HttpError } from "../utils";
import { Device } from "../models";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = deviceValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<deviceService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const devices = await deviceService.many(query);
    const count = await deviceService.count(query);

    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: devices
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = deviceValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<deviceService.WhereOne> = {
      where: {
        id: params.device_id,
        carrier_id: req.user.company_id
      }
    };

    const device = await deviceService.one(query);
    if (!device) throw HttpError.notFound("Device");

    res.status(200).json(device);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = deviceValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    const { id } = await deviceService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = deviceValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = deviceValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<deviceService.WhereOne> = {
      where: {
        id: params.device_id,
        carrier_id: req.user.company_id
      }
    };


    const count = await deviceService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Device");

    res.status(200).json({ message: `device with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = deviceValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<deviceService.WhereOne> = {
      where: {
        id: params.device_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await deviceService.remove(query);
    if (count === 0) throw HttpError.notFound("Device");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getDevicesCount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { error: paramsError, value: params } = deviceValidator.count.query.validate(req.query);
    // if (paramsError) throw HttpError.badRequest(paramsError.message);

    // const currentDate = new Date();
    // const timeRange: any = req.query.timeRange; // Replace with actual user input

    // let startDate: Date, endDate: Date;

    // if (timeRange === 'month') {
    //   startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
    //   endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
    // } else if (timeRange === 'halfYear') {
    //   startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
    //   endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
    // } else {
    //   startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 12, currentDate.getDate());
    //   endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
    // }

    // // Adjust the time part of the start and end dates to be 00:00:00
    // startDate.setHours(0, 0, 0, 0);
    // endDate.setHours(0, 0, 0, 0);

    const devices = await deviceService.findAndCountAll({
      where: {
        // service_start_date: {
        //   [sequelize.Op.between]: [startDate, endDate]
        // },
        // service_end_date: {
        //   [sequelize.Op.between]: [startDate, endDate]
        // },
        carrier_id: req.user.company_id
      },
      attributes: [
        "type",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"]
      ],
      group: ["type"],
    });

    res.status(200).json(devices.rows);

  } catch (error) {
    next(error);
  }
};
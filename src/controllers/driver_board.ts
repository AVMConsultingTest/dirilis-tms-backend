import { Request, Response, NextFunction } from "express";

import { driverBoardValidator } from "../validators";
import { driverBoardService } from "../services";
import { HttpError } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = driverBoardValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    // Modify this line based on how you get company_id from the request or user
    where.carrier_id = req.user.company_id;

    const query = {
      page_number,
      page_size,
      where
    };

    const driverBoards = await driverBoardService.manyDriverBoard(query);
    const count = await driverBoardService.countDriverBoard(query);

    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: driverBoards
    });
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = driverBoardValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    // Modify this line based on how you get company_id from the request or user
    payload.carrier_id = req.user.company_id;

    const { id } = await driverBoardService.createDriverBoard(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = driverBoardValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = driverBoardValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query = {
      where: {
        id: params.driver_board_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await driverBoardService.updateDriverBoard(payload, query);
    if (count === 0) throw HttpError.notFound("Driver Board");

    res.status(200).json({ message: `Driver board with ID ${params.driver_board_id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = driverBoardValidator.update.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query = {
      where: {
        id: params.driver_board_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await driverBoardService.removeDriverBoard(query);
    if (count === 0) throw HttpError.notFound("Driver Board");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

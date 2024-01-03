import { Request, Response, NextFunction } from "express";

import { driverValidator } from "../validators";
import { cdlService, driverService } from "../services";
import { HttpError, xslx } from "../utils";
import { IDriverCreate } from "../models";
import { sequelize } from "../configs";
import { EDriverStatus } from "../types";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = driverValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<driverService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const drivers = await driverService.many(query);
    const count = await driverService.count(query);

    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: drivers
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

    const drivers = await driverService.all({ where: { carrier_id: req.user.company_id } });

    res.status(200).json({ data: drivers });
  }
  catch (error) {
    next(error);
  }
};  

// need to optimize
export const summary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activeDriversQuery: Query<driverService.WhereMany> = {
      where: {
        carrier_id: req.user.company_id,
        status: EDriverStatus.Active
      }
    };
    const activeDriversCount = await driverService.count(activeDriversQuery);

    const onVacationDriversQuery: Query<driverService.WhereMany> = {
      where: {
        carrier_id: req.user.company_id,
        status: EDriverStatus.OnVacation
      }
    };
    const onVacationDriversCount = await driverService.count(onVacationDriversQuery);

    res.status(200).json({
      active_drivers: activeDriversCount,
      drivers_on_vacation: onVacationDriversCount,
      scheduled_trainings: 15,
      dispatched_drivers: 10,
      on_duty_drivers: 5,
      off_duty_drivers: 5,
      high_risk_drivers: 5,
      drivers_with_overdue_documents: 12,
      drivers_with_pending_docs: 2,
      outstanding_dvers: 4,
      drug_tests: 5,
      drug_test_off_duty_drivers: 0
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    (req.params);
    const { error: paramsError, value: params } = driverValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<driverService.WhereOne> = {
      where: {
        id: params.driver_id,
        carrier_id: req.user.company_id
      }
    };

    const driver = await driverService.one(query);
    if (!driver) throw HttpError.notFound("Driver");

    res.status(200).json(driver);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    const { error, value: p } = driverValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    const { cdls, ...payload } = p;

    payload.carrier_id = req.user.company_id;

    const { id } = await driverService.create(payload, { transaction });

    const now = new Date();
    
    for(const cdl of cdls) {
      if(now.getTime() >= cdl.expiration_date.getTime()) throw HttpError.badRequest("Expiration date is not valid");
      cdl.driver_id = id;
      cdl.carrier_id = req.user.company_id;
      cdl.user_id = req.user.id;

      await cdlService.create(cdl, { transaction });
    }
    
    await transaction.commit();
    transaction.isCommitted = true;
    res.status(201).json({ id });
  } catch (error) {
    if(!transaction.isCommitted) await transaction.rollback();
    next(error);
  }
};

export const createMany = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  let isComitted = false;
  try {
    const file = req.file;
    if(!file) throw HttpError.badRequest("Excel file is required");

    const data = xslx.parse(file.buffer) as IDriverCreate[];

    for(let i = 0; i < data.length; i++) {
      const item = data[i];
      const { error } = driverValidator.create.body.validate(item);
      if (error) throw HttpError.badRequest(`Row ${i + 2}: ${error.message}`);
    }

    for(const item of data) {
      item.carrier_id = req.user.company_id;
      await driverService.create(item, { transaction });
    }

    await transaction.commit();
    isComitted = true;
    res.status(200).json({  message: "Drivers created successfully" });
  } catch(error) {
    if(!isComitted) await transaction.rollback();
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = driverValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = driverValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<driverService.WhereOne> = {
      where: {
        id: params.driver_id,
        carrier_id: req.user.company_id
      }
    };


    const count = await driverService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Driver");

    res.status(200).json({ message: `driver with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = driverValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<driverService.WhereOne> = {
      where: {
        id: params.driver_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await driverService.remove(query);
    if (count === 0) throw HttpError.notFound("Driver");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
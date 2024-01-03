import { Request, Response, NextFunction } from "express";

import { loadValidator } from "../validators";
import { loadService, loadStopService } from "../services";
import { HttpError } from "../utils";
import { ELoadBrokerStatus, ELoadStatus, EUserRole } from "../types";
import { sequelize } from "../configs";

type BrokerLoadValidatorReturnType = ReturnType<typeof loadValidator.createForBroker.body.validate>["value"];
type CarrierLoadValidatorReturnType = ReturnType<typeof loadValidator.createForCarrier.body.validate>["value"];


export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = loadValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    if(req.user.role === EUserRole.Broker) {
      where.broker_id = req.user.id;
    }

    if(req.user.role == EUserRole.Carrier) {
      if(q.broker_status === ELoadBrokerStatus.Booked) {
        where.carrier_id = req.user.id;
      }
      else if(q.broker_status) where.broker_status = ELoadBrokerStatus.Published;
      if(q.status) {
        where.carrier_id = req.user.id;
      }
    }

    const query: Query<loadService.WhereMany, EUserRole> = {
      page_number,
      page_size,
      where,
      select: req.user.role
    };

    const loads = await loadService.many(query);
    const count = await loadService.count(query);
    
    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: loads
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = loadValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    // Define the common query structure
    const query: Query<loadService.WhereOne, EUserRole> = {
      where: {
        id: params.load_id,
      },
      select: req.user.role
    };

    if (req.user.role === EUserRole.Broker) {
      // For Brokers, add broker_id condition to the common query
      Object.assign(query.where, { broker_id: req.user.company_id });
    } else if (req.user.role === EUserRole.Carrier) {
      // For Carriers, add carrier_id condition to the common query
      Object.assign(query.where, { carrier_id: req.user.company_id });
    } else {
      throw HttpError.badRequest("Invalid user role");
    }

    const load = await loadService.one(query);
    if (!load) throw HttpError.notFound("Load");

    res.status(200).json(load);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    let payload: BrokerLoadValidatorReturnType | CarrierLoadValidatorReturnType;

    if(req.user.role === EUserRole.Carrier) {
      const { error, value } = loadValidator.createForCarrier.body.validate(req.body);
      if (error) throw HttpError.badRequest(error.message);

      payload = value;
      payload.carrier_id = req.user.company_id;
      payload.status = ELoadStatus.Created;
      payload.dispatcher_id = req.user.id;
      payload.source = "Nebula";

    } else if(req.user.role === EUserRole.Broker) {
      const { error, value } = loadValidator.createForBroker.body.validate(req.body);
      if (error) throw HttpError.badRequest(error.message);

      payload = value;
      payload.broker_id = req.user.id;
      payload.broker_status = ELoadBrokerStatus.Open;
    }

    const { load_stops } = payload;

    const { id } = await loadService.create(payload, { transaction });

    if(load_stops) {
      let total_payout = 0;
      for (const load_stop of load_stops) {
        load_stop.load_id = id;
        await loadStopService.create(load_stop, { transaction });
        total_payout += load_stop.payout;
      }

      if (total_payout > 0) {
        await loadService.update({ total_payout }, { where: { id }, transaction });
      }
    }

    await transaction.commit();
    transaction.isCommitted = true;

    res.status(201).json({ id });
  } catch (error) {
    if (!transaction.isCommitted) await transaction.rollback();
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = loadValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = loadValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<loadService.WhereOne> = {
      where: {
        id: params.load_id
      }
    };

    const count = await loadService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Load");

    res.status(200).json({ message: `load with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = loadValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<loadService.WhereOne> = {
      where: {
        id: params.load_id
      }
    };

    const count = await loadService.remove(query);
    if (count === 0) throw HttpError.notFound("Load");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getManyByDriver = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = loadValidator.manyByDriver.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, primary_driver_id, start_date, end_date } = q;

    if(req.user.role !== EUserRole.Carrier) {
      next(HttpError.forbidden("You are not authorized to perform this action"));
      return;
    }

    const where: loadService.WhereMany = {
      primary_driver_id,
    };

    if (start_date && end_date) {
      console.log(start_date, end_date);
    }

    const query: Query<loadService.WhereMany, EUserRole> = {
      page_number,
      page_size,
      where,
      select: req.user.role
    };

    const loads = await loadService.many(query);
    const count = await loadService.count(query);
    
    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: loads
    });
  }
  catch (error) {
    next(error);
  }
};

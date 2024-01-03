import { Request, Response, NextFunction } from "express";

import { loadOfferValidator } from "../validators";
import { loadOfferService, loadService } from "../services";
import { HttpError } from "../utils";
import { ELoadBrokerStatus, ELoadStatus, ELoadOfferStatus, EUserRole } from "../types";
import { sequelize } from "../configs";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = loadOfferValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    const query: Query<loadOfferService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const loadOffers = await loadOfferService.many(query);
    const count = await loadOfferService.count(query);

    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: loadOffers
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = loadOfferValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<loadOfferService.WhereOne> = {
      where: {
        id: params.load_offer_id
      }
    };

    const loadOffer = await loadOfferService.one(query);
    if (!loadOffer) throw HttpError.notFound("Load Offer");

    res.status(200).json(loadOffer);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = loadOfferValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    const loadQuery: Query<loadService.WhereOne, EUserRole> = {
      where: {
        id: payload.load_id,
        carrier_id: null
      },
      select: req.user.role
    };

    const load = await loadService.one(loadQuery);
    if (!load) throw HttpError.notFound("Load");


    payload.carrier_id = req.user.company_id;
    payload.joke_offer_rate = 90;

    payload.source = "Source";

    const { id } = await loadOfferService.create(payload, {});

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    const { error, value: payload } = loadOfferValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = loadOfferValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    if (payload.status && req.user.role !== EUserRole.Broker) throw HttpError.forbidden();

    const query: Query<loadOfferService.WhereOne> = {
      where: {
        id: params.load_offer_id,
        load_id: params.load_id
      },
      transaction
    };

    const loadOffer = await loadOfferService.one(query);
    if (!loadOffer) throw HttpError.notFound("Load Offer");

    if (payload.status === ELoadOfferStatus.Assigned) {
      const loadQuery: Query<loadService.WhereOne, EUserRole> = {
        where: {
          id: params.load_id,
          broker_id: req.user.id
        },
        select: req.user.role,
        transaction
      };

      const count = await loadService.update({
        carrier_id: loadOffer.carrier_id,
        status: ELoadStatus.Created,
        broker_status: ELoadBrokerStatus.Booked
      }, loadQuery);
      if(count === 0) throw HttpError.badRequest("Load not found");
    }

    await loadOfferService.update(payload, query);

    if (payload.status === ELoadOfferStatus.Assigned) {
      const updateQuery: Query<loadOfferService.WhereMany> = {
        where: {
          load_id: params.load_id,
          status: ELoadOfferStatus.Pending
        },
        transaction
      };

      await loadOfferService.update({ status: ELoadOfferStatus.Declined }, updateQuery);
    }

    await transaction.commit();
    transaction.isCommitted = true;

    res.status(200).json({ message: `loadOffer with id ${query.where.id} updated successfully` });
  } catch (error) {
    if(!transaction.isCommitted) await transaction.rollback();
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = loadOfferValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<loadOfferService.WhereOne> = {
      where: {
        id: params.load_offer_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await loadOfferService.remove(query);
    if (count === 0) throw HttpError.notFound("Load Offer");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
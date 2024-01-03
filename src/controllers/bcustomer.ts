import { Request, Response, NextFunction } from "express";

import { bcustomerValidator } from "../validators";
import { bcustomerContactService, bcustomerService } from "../services";
import { HttpError } from "../utils";
import { sequelize } from "../configs";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = bcustomerValidator.many.query.validate(req.query);
    if(error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.broker_id = 6;

    const query: Query<bcustomerService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const bcustomers = await bcustomerService.many(query);
    const count = await bcustomerService.count(query);

    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: bcustomers
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = bcustomerValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<bcustomerService.WhereOne> = {
      where: {
        id: params.bcustomer_id,
        broker_id: req.user.company_id
      }
    };

    const bcustomer = await bcustomerService.one(query);
    if(!bcustomer) throw HttpError.notFound("BCustomer");

    res.status(200).json(bcustomer);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  const transaction = await sequelize.transaction();
  try {
    const { error, value: p } = bcustomerValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    const { bcustomer_contacts, ...payload } = p;

    payload.broker_id = req.user.company_id;

    const { id } = await bcustomerService.create(payload, { transaction });

    for(const bcustomer_contact of bcustomer_contacts) {
      bcustomer_contact.bcustomer_id = id;
      bcustomer_contact.broker_id = req.user.company_id;

      await bcustomerContactService.create(bcustomer_contact, { transaction });
    }

    await transaction.commit();
    transaction.isCommitted = true;

    res.status(201).json({ id });
  } catch (error) {
    if(!transaction.isCommitted) await transaction.rollback();
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = bcustomerValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = bcustomerValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<bcustomerService.WhereOne> = {
      where: {
        id: params.bcustomer_id,
        broker_id: req.user.company_id
      }
    };

    const count = await bcustomerService.update(payload, query);
    if(count === 0) throw HttpError.notFound("BCustomer");

    res.status(200).json({ message: `bcustomer with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = bcustomerValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<bcustomerService.WhereOne> = {
      where: {
        id: params.bcustomer_id,
        broker_id: req.user.company_id
      }
    };

    const count = await bcustomerService.remove(query);
    if(count === 0) throw HttpError.notFound("BCustomer");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
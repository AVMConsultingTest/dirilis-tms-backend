import { Request, Response, NextFunction } from "express";

import { bcustomerContactValidator } from "../validators";
import { bcustomerContactService } from "../services";
import { HttpError } from "../utils";


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = bcustomerContactValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    const { error: errorParams, value: params } = bcustomerContactValidator.create.params.validate(req.params);
    if (errorParams) throw HttpError.badRequest(errorParams.message);

    payload.broker_id = req.user.company_id;
    payload.bcustomer_id = params.bcustomer_id;

    console.log(params, payload);

    const { id } = await bcustomerContactService.create(payload, {});

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = bcustomerContactValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = bcustomerContactValidator.update.params.validate(req.params);
    
    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<bcustomerContactService.WhereOne> = {
      where: {
        id: params.bcustomer_contact_id,
        bcustomer_id: params.bcustomer_id,
        broker_id: req.user.company_id
      }
    };

    const count = await bcustomerContactService.update(payload, query);
    if(count === 0) throw HttpError.notFound("BCustomerContact");

    res.status(200).json({ message: `bcustomerContact with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = bcustomerContactValidator.delete.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<bcustomerContactService.WhereOne> = {
      where: {
        id: params.bcustomer_contact_id,
        bcustomer_id: params.bcustomer_id,
        broker_id: req.user.company_id
      }
    };

    const count = await bcustomerContactService.remove(query);
    if(count === 0) throw HttpError.notFound("BCustomerContact");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
import { Request, Response, NextFunction } from "express";

import { sambaCredentialValidator } from "../validators";
import { sambaCredentialService } from "../services";
import { HttpError } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = sambaCredentialValidator.many.query.validate(req.query);
    if(error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<sambaCredentialService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const sambaCredentials = await sambaCredentialService.many(query);
    const count = await sambaCredentialService.count(query);
        
    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: sambaCredentials
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = sambaCredentialValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<sambaCredentialService.WhereOne> = {
      where: {
        id: params.samba_credential_id,
        carrier_id: req.user.company_id
      }
    };

    const sambaCredential = await sambaCredentialService.one(query);
    if(!sambaCredential) throw HttpError.notFound("SambaCredential");
     
    res.status(200).json(sambaCredential);
  } catch (error) {
    next(error);
  }
};


export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = sambaCredentialValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    const { id } = await sambaCredentialService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = sambaCredentialValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = sambaCredentialValidator.update.params.validate(req.params);
    
    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<sambaCredentialService.WhereOne> = {
      where: {
        id: params.samba_credential_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await sambaCredentialService.update(payload, query);
    if(count === 0) throw HttpError.notFound("SambaCredential");

    res.status(200).json({ message: `sambaCredential with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = sambaCredentialValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<sambaCredentialService.WhereOne> = {
      where: {
        id: params.samba_credential_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await sambaCredentialService.remove(query);
    if(count === 0) throw HttpError.notFound("SambaCredential");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
import { Request, Response, NextFunction } from "express";
import sequelize from "sequelize";

import { applicantValidator } from "../validators";
import { applicantService } from "../services";
import { HttpError } from "../utils";
import { EApplicantStatus } from "../types";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = applicantValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    where.carrier_id = req.user.company_id;

    const query: Query<applicantService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const applicants = await applicantService.many(query);
    const count = await applicantService.count(query);

    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: applicants
    });
  }
  catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = applicantValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<applicantService.WhereOne> = {
      where: {
        id: params.applicant_id,
        carrier_id: req.user.company_id
      }
    };

    const applicant = await applicantService.one(query);
    if (!applicant) throw HttpError.notFound("Applicant");

    res.status(200).json(applicant);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = applicantValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    payload.carrier_id = req.user.company_id;

    const { id } = await applicantService.create(payload);

    res.status(201).json({ id });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = applicantValidator.update.body.validate(req.body);
    const { error: paramsError, value: params } = applicantValidator.update.params.validate(req.params);

    if (error) throw HttpError.badRequest(error.message);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<applicantService.WhereOne> = {
      where: {
        id: params.applicant_id,
        carrier_id: req.user.company_id
      }
    };


    const count = await applicantService.update(payload, query);
    if (count === 0) throw HttpError.notFound("Applicant");

    res.status(200).json({ message: `applicant with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = applicantValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<applicantService.WhereOne> = {
      where: {
        id: params.applicant_id,
        carrier_id: req.user.company_id
      }
    };

    const count = await applicantService.remove(query);
    if (count === 0) throw HttpError.notFound("Applicant");

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const summary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pending_approvals = await applicantService.count({
      where: {
        status: {
          [sequelize.Op.in]: [
            EApplicantStatus.Training,
            EApplicantStatus.NotCompleted,
            EApplicantStatus.NewApplicant,
          ]
        }
      }
    });

    const pending_training = await applicantService.count({
      where: {
        status: {
          [sequelize.Op.in]: [
            EApplicantStatus.Training,
            EApplicantStatus.NewApplicant,
          ]
        }
      }
    });

    res.status(200).json({
      pending_documents: 1,
      pending_approvals,
      pending_training,
    });

  } catch (error) {
    (error);
    next(error);
  }
};
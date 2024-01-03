import { Request, Response, NextFunction } from "express";
import { companyValidator } from "../validators";
import { HttpError } from "../utils";
import { companyService, userService } from "../services";
import { ECompanyType, EUserRole } from "../types";

export const onboarding = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = companyValidator.onboarding.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    const updateUserQuery: Query<userService.WhereOne> = {
      where: {
        id: req.user.id,
        company_id: null
      }
    };

    const count = await userService.update(payload.user, updateUserQuery);
    if (count === 0) throw HttpError.badRequest("User already onboarded");

    payload.company.type = req.user.role === EUserRole.Carrier ? ECompanyType.Carrier : ECompanyType.Broker;

    const company = await companyService.create(payload.company);

    await userService.update({
      company_id: company.id
    }, updateUserQuery);

    res.status(201).json({ id: company.id });
  } catch (error) {
    next(error);
  }
};
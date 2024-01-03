import { Request, Response, NextFunction } from "express";

import { generatePassword } from "../utils/password";
import { userValidator } from "../validators";
import { sendEmail } from "../utils/email";
import { userService } from "../services";
import { HttpError } from "../utils";
import { EMAIL_FROM, NODE_ENV } from "../configs";
import { EUserRole } from "../types";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = userValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);

    const { page_number, page_size, ...where } = q;

    if (req.user.role !== EUserRole.Admin) where.company_id = req.user.id;

    const query: Query<userService.WhereMany> = {
      page_number,
      page_size,
      where
    };

    const users = await userService.many(query);
    const count = await userService.count(query);

    const total_pages = Math.ceil(count / query.page_size);

    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error: paramsError, value: params } = userValidator.one.params.validate(req.params);
    if (paramsError) throw HttpError.badRequest(paramsError.message);

    const query: Query<userService.WhereOne> = {
      where: {
        id: params.user_id
      }
    };

    const user = userService.one(query);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req;
    user.permissions = [];
    for(const user_role of user.user_roles) {
      const { role } = user_role;
      for(const permission of role.permissions) {
        if(permission.can_read || permission.can_write) user.permissions.push(permission);
      }
    }
    delete user.user_roles;
    delete user.password;
    res.json(user);
  } catch(error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = userValidator.create.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    const password = generatePassword();

    payload.password = password;
    payload.is_password_changed = false;

    if(req.user.role !== EUserRole.Admin) {
      payload.company_id =  req.user.company_id;
      payload.role = req.user.role;
    } else {
      payload.is_owner = true;
    }

    const user = await userService.create(payload);

    if (NODE_ENV === "production") {
      // send email to user with password
      const emailData = {
        to: user.email,
        from: EMAIL_FROM,
        subject: "Welcome to the platform",
        text: `Your password is ${password}. Please change it after logging in.`,
        html: `<p>Your password is ${password}. Please change it after logging in.</p>`,
      };

      await sendEmail(emailData);
    }

    res.status(201).json({ id: user.id, password });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = userValidator.update.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);
    const { error: errorParams, value: params } = userValidator.update.params.validate(req.body);
    if (errorParams) throw HttpError.badRequest(errorParams.message);

    const query: Query<userService.WhereOne> = {
      where: {
        id: params.user_id
      }
    };

    if(req.user.role !== EUserRole.Admin) {
      query.where.company_id = req.user.company_id;
    }
    const count = await userService.update(payload, query);
    if(!count) throw HttpError.notFound("User");

    res.status(201).json({ message: `truck with id ${query.where.id} updated successfully` });
  } catch (error) {
    next(error);
  }
};
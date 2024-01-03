import { Request, Response, NextFunction } from "express";

import { jwt } from "../utils";
import { authValidator } from "../validators";
import { HttpError } from "../utils";
import { userService } from "../services";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: where } = authValidator.login.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    const query: Query<userService.WhereOneByEmailAndPassword> = {
      where
    };
        
    const user = await userService.oneByEmailAndPassword(query);
    if(!user) throw HttpError.badRequest("Invalid email or password");
    if(!user.is_password_changed) throw HttpError.forbidden("Please change your password before logging in");

    const access_token = jwt.create({ id: user.id, role: user.role }, "2d");
    const refresh_token = jwt.create({ id: user.id, role: user.role }, "2d");

    const updateQuery: Query<userService.WhereOne> = {
      where: {
        id: user.id
      }
    };

    await userService.update({ refresh_token }, updateQuery);

    res.cookie("refresh_token", refresh_token, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ access_token, role: user.role, company_id: user.company_id });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: payload } = authValidator.updatePassword.body.validate(req.body);
    if (error) throw HttpError.badRequest(error.message);

    const { new_password, ...where } = payload;

    const query: Query<userService.WhereOneByEmailAndPassword> = {
      where
    };

    const user = await userService.oneByEmailAndPassword(query);
    if(!user) throw HttpError.badRequest("Invalid email or password");

    const updateQuery: Query<userService.WhereOne> = {
      where: {
        id: user.id
      }
    };

    const access_token = jwt.create({ id: user.id, role: user.role }, "2d");
    const refresh_token = jwt.create({ id: user.id, role: user.role }, "2d");

    await userService.update({
      password: new_password,
      is_password_changed: true,
      refresh_token,
    }, updateQuery);

    res.cookie("refresh_token", refresh_token, { httpOnly: true, sameSite: "none", secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ access_token, role: user.role, company_id: user.company_id });
  } catch (error) {
    next(error);
  }
};

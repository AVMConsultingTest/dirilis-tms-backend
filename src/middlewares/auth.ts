import { Request, Response, NextFunction } from "express";

import { HttpError, jwt } from "../utils";
import { userService } from "../services";
import { IUser } from "../models";

export async function isAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) throw HttpError.unauthorized();

    const payload = jwt.verify<IUser>(token);

    const query: Query<userService.WhereOne> = {
      where: {
        id: payload.id
      }
    };

    const user = await userService.one(query);
    if (!user) throw HttpError.unauthorized();

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

export default isAuth;
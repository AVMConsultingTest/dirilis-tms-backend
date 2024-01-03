import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils";

const writeMethods = ["POST", "PUT", "DELETE"];
const readMethods = ["GET"];

export const checkRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, baseUrl, method } = req;
    if (!user) throw HttpError.forbidden();
    if(!baseUrl.includes(user.role)) throw HttpError.forbidden();
    
    if(user.is_owner) return next();
    
    for (const user_role of user.user_roles) {
      const { role } = user_role;
      for (const permission of role.permissions) {
        if (baseUrl.includes(permission.route)) {
          let allowMethods: string[] = [];
          if(permission.can_read) allowMethods = [...readMethods];
          if(permission.can_write) allowMethods = [...allowMethods, ...writeMethods];

          if(!allowMethods.includes(method)) {
            throw HttpError.forbidden();
          }
          return next();
        }
      }
    }
    throw HttpError.forbidden();
  } catch (err) {
    next(err);
  }
};
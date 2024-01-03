import { Request, Response, NextFunction } from "express";
import { EUserRole } from "../types";
import { HttpError } from "../utils";

// Roles Authorization middleware
export const allowRoles = (roles?: EUserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) throw HttpError.forbidden();
      if (roles && !roles.includes(req.user.role)) throw HttpError.forbidden();
            
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default allowRoles;
import { Request, Response, NextFunction } from "express";
import { eldIftaDriverValidator } from "../validators";
import { eldIftaDriverService } from "../services";
import { HttpError, flattenObject } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = eldIftaDriverValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);
  
    const { page_number, page_size, ...where } = q;
  
    where.carrier_id = req.user.company_id;
  
    const query: Query<eldIftaDriverService.WhereMany> = {
      page_number,
      page_size,
      where
    };
  
    const eldIftaDrivers = await eldIftaDriverService.many(query);
    const count = await eldIftaDriverService.count(query);
  
    const total_pages = Math.ceil(count / query.page_size);

    const data = flattenObject(eldIftaDrivers);
  
    res.status(200).json({
      page_size: query.page_size,
      page_number: query.page_number,
      total_pages,
      data
    });
  }
  catch (error) {
    next(error);
  }
};
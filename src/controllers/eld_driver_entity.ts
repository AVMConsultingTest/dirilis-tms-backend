import { Request, Response, NextFunction } from "express";
import { eldDriverEntityValidator } from "../validators";
import { eldDriverEntityService } from "../services";
import { HttpError, flattenObject } from "../utils";

export const getMany = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value: q } = eldDriverEntityValidator.many.query.validate(req.query);
    if (error) throw HttpError.badRequest(error.message);
  
    const { page_number, page_size, ...where } = q;
  
    where.carrier_id = req.user.company_id;
  
    const query: Query<eldDriverEntityService.WhereMany> = {
      page_number,
      page_size,
      where
    };
  
    const eldDriverEntities = await eldDriverEntityService.many(query);
    const count = await eldDriverEntityService.count(query);
  
    const total_pages = Math.ceil(count / query.page_size);

    const data = flattenObject(eldDriverEntities);
  
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
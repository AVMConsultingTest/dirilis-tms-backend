import { EEldTrailerEntityStatus } from "../types";
import { eldTrailerEntityService } from "../services";
import Joi from "joi";

export const eldTrailerEntityValidator = {
  many: {
    query: Joi.object<Flat<Query<eldTrailerEntityService.WhereMany>, "where">>({
      status: Joi.string().valid(...Object.values(EEldTrailerEntityStatus)),
      page_number: Joi.number().min(1),
      page_size: Joi.number().min(1)
    })
  }
};
import Joi from "joi";
import { IClientCreate } from "../models";

export const clientValidator = {
  demoRequest: {
    body: Joi.object<IClientCreate>({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required().trim(),
      company_name: Joi.string().required(),
      company_type: Joi.string().required().trim(),
      source: Joi.string().trim(),
    })
  }
};
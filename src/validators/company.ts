import Joi from "joi";
import { companyService } from "../services";
import { ICompanyCreate, ICompanyUpdate, IUserUpdate } from "../models";
import { ECompanyType } from "../types";

type ICompanyParams = {
  company_id: number
}

type IOnboarding = {
  user: IUserUpdate
  company: ICompanyCreate
}

export const companyValidator = {
  onboarding: {
    body: Joi.object<IOnboarding>({
      user: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        username: Joi.string().required(),
        job_title: Joi.string().required(),
        phone_number: Joi.string().required(),
      }),
      company: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone_number: Joi.string().required(),
        address_line1: Joi.string().required(),
        address_line2: Joi.string().optional(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        zip_code: Joi.string().required(),
        country: Joi.string().required(),
        logo: Joi.string().required(),

        account_number: Joi.string().required(),
        routing_number: Joi.string().required(),
        mc_number: Joi.string().required(),
        dot_number: Joi.string().required(),

        factoring_company:Joi.string(),
        factoring_account_number:Joi.string(),
        factoring_username:Joi.string(),
        factoring_password:Joi.string(),
      })
    })
  },
  update: {
    params: Joi.object<ICompanyParams>({
      company_id: Joi.number().required()
    }),
    body: Joi.object<ICompanyUpdate>({
      name: Joi.string(),
      email: Joi.string().email(),
      phone_number: Joi.string(),
      address_line1: Joi.string(),
      address_line2: Joi.string(),
      state: Joi.string(),
      city: Joi.string(),
      zip_code: Joi.string(),
      country: Joi.string().required(),
      account_number: Joi.string(),
      routing_number: Joi.string(),
      ein_number: Joi.string(),
      mc_number: Joi.string(),
      dot_number: Joi.string(),

      factoring_company:Joi.string(),
      factoring_account_number:Joi.string(),
      factoring_username:Joi.string(),
      factoring_password:Joi.string(),
    })
  },
  one: {
    params: Joi.object<ICompanyParams>({
      company_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<ICompanyParams>({
      company_id: Joi.number().required()
    })
  },
  many: {
    query: Joi.object<Flat<Query<companyService.WhereMany>, "where">>({
      name: Joi.string(),
      type: Joi.string().valid(...Object.values(ECompanyType))
    })
  }
};
import Joi from "joi";
import { EApplicantType, ECdlClass, ECdlType, EDriverStatus, EDriverSubstatus } from "../types";
import { ICdlCreate, IDriverCreate, IDriverUpdate } from "../models";
import { driverService } from "../services";

type IDriverParams = {
  driver_id: number
}

type IDriverCreateExtra = {
  cdls: ICdlCreate[]
}

export const driverValidator = {
  create: {
    body: Joi.object<IDriverCreate & IDriverCreateExtra>({
      avatar: Joi.number().optional(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      ssn: Joi.string().required(),
      dob: Joi.date().required(),
      email: Joi.string().email().required(),
      contact_phone_number: Joi.string().required(),
      emergency_phone_number: Joi.string().required(),
      emergency_phone_number_name: Joi.string().required(),
      type: Joi.string().valid(...Object.values(EApplicantType)).required(),
      w9_exist: Joi.boolean().required(),
      is_restricted: Joi.boolean().required(),
      restricted_notes: Joi.string(),
      address_line_1: Joi.string().required(),
      address_line_2: Joi.string(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip_code: Joi.string().required(),
      employee_id: Joi.string().optional(),
      employee_type: Joi.string().optional(),
      notes: Joi.string(),
      account_number: Joi.string(),
      routing_number: Joi.string(),
      payment_type: Joi.string(),
      hire_date: Joi.date(),
      payment_rates: Joi.number(),
      tax_form: Joi.string(),
      recurring_deductions: Joi.number(),
      compensation: Joi.number(),
      caption: Joi.string(),
      status: Joi.string().valid(...Object.values(EDriverStatus)).required(),
      twic_card: Joi.boolean(),
      twic_card_notes: Joi.string(),
      
      cdls: Joi.array().items(Joi.object({
        issued_state: Joi.string().required(),
        number: Joi.string().required(),
        expiration_date: Joi.date().required(),
        file: Joi.string().required(),
        type: Joi.string().valid(...Object.values(ECdlType)).required(),
        class: Joi.string().valid(...Object.values(ECdlClass)).required(),
        comment: Joi.string(),
        endorsement: Joi.string().required(),
      }))
    }),
  },
  many: {
    query: Joi.object<Flat<Query<driverService.WhereMany>, "where">>({
      type: Joi.string().valid(...Object.values(EApplicantType)),
      status: Joi.string().valid(...Object.values(EDriverStatus)),
      substatus: Joi.string().valid(...Object.values(EDriverSubstatus)),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  },
  one: {
    params: Joi.object<IDriverParams>({
      driver_id: Joi.string().required()
    })
  },
  update: {
    params: Joi.object<IDriverParams>({
      driver_id: Joi.string().required()
    }),
    body: Joi.object<IDriverUpdate>({
      avatar: Joi.number(),
      first_name: Joi.string(),
      last_name: Joi.string(),
      ssn: Joi.string(),
      dob: Joi.date(),
      email: Joi.string().email(),
      contact_phone_number: Joi.string(),
      emergency_phone_number: Joi.string(),
      hire_date: Joi.date(),
      emergency_phone_number_name: Joi.string(),
      type: Joi.string().valid(...Object.values(EApplicantType)),
      w9_exist: Joi.boolean(),
      is_restricted: Joi.boolean(),
      restricted_notes: Joi.string(),
      address_line_1: Joi.string(),
      address_line_2: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      zip_code: Joi.string(),
      employee_id: Joi.string(),
      employee_type: Joi.string(),
      truck_id: Joi.number(),
      trailer_id: Joi.number(),
      notes: Joi.string(),
      account_number: Joi.string(),
      routing_number: Joi.string(),
      payment_type: Joi.string(),
      payment_rates: Joi.number(),
      tax_form: Joi.string(),
      recurring_deductions: Joi.number(),
      compensation: Joi.number(),
      caption: Joi.string(),
      status: Joi.string().valid(...Object.values(EDriverStatus)),
      substatus: Joi.string().valid(...Object.values(EDriverSubstatus)),
      twic_card: Joi.boolean(),
      twic_card_notes: Joi.string(),
    })
  },
  delete: {
    params: Joi.object<IDriverParams>({
      driver_id: Joi.string().required()
    })
  },
};

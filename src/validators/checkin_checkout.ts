import Joi from "joi";
import { ICheckinCheckoutCreate, ICheckinCheckoutUpdate } from "../models";
import { ECheckinCheckoutType, ECheckinCheckoutBinder, EBool } from "../types";
import { checkinCheckoutService } from "../services";

type ICheckinCheckoutParams = {
  checkin_checkout_id: number,
}

export const checkinCheckoutValidator = {
  create: {
    body: Joi.object<ICheckinCheckoutCreate>({
      type: Joi.string().valid(...Object.values(ECheckinCheckoutType)).required(),
      binder: Joi.string().valid(...Object.values(ECheckinCheckoutBinder)).required(),
      ifta_number: Joi.string().required(),
      ny_number: Joi.string().required(),
      ky_permit_current: Joi.string().valid(...Object.values(EBool)).required(),
      nv_permit_current: Joi.string().valid(...Object.values(EBool)).required(),
      nm_permit_current: Joi.string().valid(...Object.values(EBool)).required(),
      or_permit_current: Joi.string().valid(...Object.values(EBool)).required(),
      ct_permit_current: Joi.string().valid(...Object.values(EBool)).required(),

      valid_insurance: Joi.string().valid(...Object.values(EBool)).required(),
      registiration_current: Joi.string().valid(...Object.values(EBool)).required(),
      tablet_charger: Joi.string().valid(...Object.values(EBool)).required(),
      fuel_card: Joi.string().valid(...Object.values(EBool)).required(),
      mileage: Joi.string().required(),
      damage: Joi.string().required(),
      damage_type: Joi.string().required(),
      fleet_rep: Joi.string().required(),

      primary_driver_id: Joi.number().required(),
      secondary_driver_id: Joi.number(),
      truck_id: Joi.number().required(),
    })
  },
  update: {
    params: Joi.object<ICheckinCheckoutParams>({
      checkin_checkout_id: Joi.number().required()
    }),
    body: Joi.object<ICheckinCheckoutUpdate>({
      type: Joi.string().valid(...Object.values(ECheckinCheckoutType)),
      binder: Joi.string().valid(...Object.values(ECheckinCheckoutBinder)),
      ifta_number: Joi.string(),
      ny_number: Joi.string(),
      ky_permit_current: Joi.string().valid(...Object.values(EBool)),
      nv_permit_current: Joi.string().valid(...Object.values(EBool)),
      nm_permit_current: Joi.string().valid(...Object.values(EBool)),
      or_permit_current: Joi.string().valid(...Object.values(EBool)),
      ct_permit_current: Joi.string().valid(...Object.values(EBool)),

      valid_insurance: Joi.string().valid(...Object.values(EBool)),
      registiration_current: Joi.string().valid(...Object.values(EBool)),
      tablet_charger: Joi.string().valid(...Object.values(EBool)),
      fuel_card: Joi.string().valid(...Object.values(EBool)),
      mileage: Joi.string(),
      damage: Joi.string(),
      damage_type: Joi.string(),
      fleet_rep: Joi.string(),

      primary_driver_id: Joi.number(),
      secondary_driver_id: Joi.number(),
      truck_id: Joi.number(),
    })
  },
  one: {
    params: Joi.object<ICheckinCheckoutParams>({
      checkin_checkout_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<ICheckinCheckoutParams>({
      checkin_checkout_id: Joi.number().required()
    })
  },
  many: {
    query: Joi.object<Flat<Query<checkinCheckoutService.WhereMany>, "where">>({
      type: Joi.string().valid(...Object.values(ECheckinCheckoutType)),
      binder: Joi.string().valid(...Object.values(ECheckinCheckoutBinder)),
      page_size: Joi.number(),
      page_number: Joi.number()
    })
  }
};
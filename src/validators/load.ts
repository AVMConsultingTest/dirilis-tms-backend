import Joi from "joi";
import { ILoadCreate, ILoadUpdate } from "../models";
import { loadService } from "../services";
import { ELoadBrokerStatus, ELoadStatus } from "../types";

type ILoadParams = {
  load_id: number
}

type ManyByDriverQuery = {
  page_size?: number;
  page_number?: number;
  primary_driver_id: number;
  start_date?: Date;
  end_date?: Date;
}

export const loadValidator = {
  createForBroker: {
    body: Joi.object<ILoadCreate>({
      miles: Joi.number(),

      pickup_address_line1: Joi.string().required(),
      pickup_address_line2: Joi.string(),
      pickup_city: Joi.string().required(),
      pickup_state: Joi.string().required(),
      pickup_zip_code: Joi.string().required(),
      pickup_date: Joi.date().required(),

      drop_off_address_line1: Joi.string().required(),
      drop_off_address_line2: Joi.string(),
      drop_off_city: Joi.string().required(),
      drop_off_state: Joi.string().required(),
      drop_off_zip_code: Joi.string().required(),
      drop_off_date: Joi.date().required(),
      total_distance: Joi.number(),
      carrier_revenue: Joi.number(),

      customer_id: Joi.number(),
      commodity_type: Joi.string(),

      broker_revenue: Joi.number(),
      max_buy: Joi.number(),
      buy_now: Joi.number(),
      loading_type: Joi.string(),
      unloading_type: Joi.string(),
      is_trailer_required: Joi.boolean(),

      load_stops: Joi.array().items(Joi.object({
        pickup_address_line1: Joi.string().required(),
        pickup_address_line2: Joi.string(),
        pickup_city: Joi.string().required(),
        pickup_state: Joi.string().required(),
        pickup_zip_code: Joi.string().required(),
        pickup_date: Joi.date().required(),

        drop_off_address_line1: Joi.string().required(),
        drop_off_address_line2: Joi.string(),
        drop_off_city: Joi.string().required(),
        drop_off_state: Joi.string().required(),
        drop_off_zip_code: Joi.string().required(),
        drop_off_date: Joi.date().required(),

        payout: Joi.number().required(),
        distance: Joi.number().required(),
        weight: Joi.number().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        phone_number: Joi.string().required(),
        instructions: Joi.string(),
      }))
    })
  },
  createForCarrier: {
    body: Joi.object<ILoadCreate>({
      primary_driver_id: Joi.number(),
      secondary_driver_id: Joi.number(),

      trailer_id: Joi.number(),
      truck_id: Joi.number(),

      miles: Joi.number(),
      rate_per_mile: Joi.number(),
      source: Joi.string(),

      estimated_base_rate: Joi.number(),
      estimated_duration_minutes: Joi.number(),
      estimated_fuel_surcharge: Joi.number(),
      total_payout: Joi.number(),

      pickup_address_line1: Joi.string().required(),
      pickup_address_line2: Joi.string(),
      pickup_city: Joi.string().required(),
      pickup_state: Joi.string().required(),
      pickup_zip_code: Joi.string().required(),
      pickup_date: Joi.date().required(),

      drop_off_address_line1: Joi.string().required(),
      drop_off_address_line2: Joi.string(),
      drop_off_city: Joi.string().required(),
      drop_off_state: Joi.string().required(),
      drop_off_zip_code: Joi.string().required(),
      drop_off_date: Joi.date().required(),
      total_distance: Joi.number(),
      carrier_revenue: Joi.number(),

      loading_type: Joi.string(),
      unloading_type: Joi.string(),

      load_stops: Joi.array().items(Joi.object({
        pickup_address_line1: Joi.string().required(),
        pickup_address_line2: Joi.string(),
        pickup_city: Joi.string().required(),
        pickup_state: Joi.string().required(),
        pickup_zip_code: Joi.string().required(),
        pickup_date: Joi.date().required(),

        drop_off_address_line1: Joi.string().required(),
        drop_off_address_line2: Joi.string(),
        drop_off_city: Joi.string().required(),
        drop_off_state: Joi.string().required(),
        drop_off_zip_code: Joi.string().required(),
        drop_off_date: Joi.date().required(),

        payout: Joi.number().required(),
        distance: Joi.number().required(),
        weight: Joi.number().required(),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        phone_number: Joi.string().required(),
        instructions: Joi.string(),
      }))
    })
  },
  update: {
    params: Joi.object<ILoadParams>({
      load_id: Joi.number().required()
    }),
    body: Joi.object<ILoadUpdate>({
      primary_driver_id: Joi.number(),
      secondary_driver_id: Joi.number(),

      trailer_id: Joi.number(),
      truck_id: Joi.number(),

      status: Joi.string().valid(...Object.values(ELoadStatus)),

      miles: Joi.number(),
      rate_per_mile: Joi.number(),
      source: Joi.string(),

      estimated_base_rate: Joi.number(),
      estimated_duration_minutes: Joi.number(),
      estimated_fuel_surcharge: Joi.number(),
      total_payout: Joi.number(),

      pickup_address_line1: Joi.string(),
      pickup_address_line2: Joi.string(),
      pickup_city: Joi.string(),
      pickup_state: Joi.string(),
      pickup_zip_code: Joi.string(),
      pickup_date: Joi.date(),

      drop_off_address_line1: Joi.string(),
      drop_off_address_line2: Joi.string(),
      drop_off_city: Joi.string(),
      drop_off_state: Joi.string(),
      drop_off_zip_code: Joi.string(),
      drop_off_date: Joi.date(),

      carrier_revenue: Joi.number(),

      customer_id: Joi.number(),
      commodity_type: Joi.string(),

      broker_revenue: Joi.number(),
      total_distance: Joi.number(),
      broker_status: Joi.string().valid(...Object.values(ELoadBrokerStatus)),
      max_buy: Joi.number(),
      buy_now: Joi.number(),
      loading_type: Joi.string(),
      unloading_type: Joi.string(),
      is_trailer_required: Joi.boolean()
    })
  },
  one: {
    params: Joi.object<ILoadParams>({
      load_id: Joi.number().required()
    })
  },
  delete: {
    params: Joi.object<ILoadParams>({
      load_id: Joi.number().required()
    })
  },
  many: {
    query: Joi.object<Flat<Query<loadService.WhereMany>, "where">>({
      page_size: Joi.number().required(),
      page_number: Joi.number().required(),
      broker_id: Joi.number(),
      carrier_id: Joi.number(),
      customer_id: Joi.number(),
      broker_status: Joi.string().valid(...Object.values(ELoadBrokerStatus)),
      status: Joi.string().valid(...Object.values(ELoadStatus)),
    })
  },
  manyByDriver: {
    query: Joi.object<ManyByDriverQuery> ({
      primary_driver_id: Joi.number().required(),
      page_size: Joi.number(),
      page_number: Joi.number(),
      start_date: Joi.date(),
      end_date: Joi.date(),
    })
  },
};
import { ELoadStatus } from "../types";

export type ELoadBrokerStatus = "Open" | "Published" | "Booked"
type Date = "2023-08-18"
export type ELoadCarrierStatus = 
  "Completed" | "Assigned" | "Enroute" | "Created" | "Accepted" | "Loading" | "Unloading" |
  "Cancelled" | "Rejected" | "Delayed" | "Checked-in at Pickup" | "Checked-out at Pickup" | "Checked-in at Drop-off" | "Checked-out at Drop-off"


type Email = "example@gmail.com"

export interface Load {
  id: number

  broker_id?: number

  primary_driver_id?: number
  secondary_driver_id?: number

  trailer_id?: number
  truck_id?: number

  status?: ELoadStatus

  total_miles?: number
  rate_per_mile?: number
  source?: string

  estimated_duration_minutes?: number
  estimated_fuel_surcharge?: number
  total_payout?: number

  // Carrier & Broker
  pickup_address_line1: string;
  pickup_address_line2?: string;
  pickup_city: string;
  pickup_state: string;
  pickup_zip_code: string;
  pickup_date: Date

  // Carrier & Broker
  drop_off_address_line1: string;
  drop_off_address_line2?: string;
  drop_off_city: string;
  drop_off_state: string;
  drop_off_zip_code: string;
  drop_off_date: Date

  carrier_revenue?: number

  // Broker
  customer_id?: number
  commodity_type?: string

  broker_revenue?: number
  broker_status?: ELoadBrokerStatus
  max_buy?: number
  buy_now?: number
  loading_type: string
  unloading_type: string
  is_trailer_required: boolean

  load_stop: LoadStop
}

export type LoadForBroker = 
  Omit<
    Load,
    "carrier_revenue"
  >

export type LoadForCarrier =
  Omit<
    Load,
    "broker_revenue" | "max_buy" | "buy_now "
  >

export type LoadCreateForBroker =
  Pick<
  Load,
    "customer_id" | "commodity_type" | "broker_revenue" | "max_buy" | "buy_now" |
    "loading_type" | "unloading_type" | "is_trailer_required" |
    "pickup_address_line1" | "pickup_address_line2" | "pickup_city" | "pickup_state" |
    "pickup_date" | "pickup_zip_code" | "drop_off_address_line1" | "drop_off_address_line2" |
    "drop_off_city" | "drop_off_date" | "drop_off_state" | "drop_off_zip_code"
  > & {
    load_stops?: LoadStopCreate[]
  }

export type LoadCreateForCarrier =
  Pick<
    Load,
    "primary_driver_id" | "trailer_id" | "truck_id" | "rate_per_mile" | "estimated_duration_minutes" |
    "secondary_driver_id" | "estimated_fuel_surcharge" | 
    "pickup_address_line1" | "pickup_address_line2" | "pickup_city" | "pickup_state" |
    "pickup_date" | "pickup_zip_code" | "drop_off_address_line1" | "drop_off_address_line2" |
    "drop_off_city" | "drop_off_date" | "drop_off_state" | "drop_off_zip_code" |
    "carrier_revenue" | "loading_type" | "unloading_type"

  > & {
    load_stops?: LoadStopCreate[]
  }

export type LoadUpdateForBroker =
  Pick<
  Load,
    "broker_status"
  >

export type LoadUpdateForCarrier =
  Pick<
    Load,
    "customer_id" | "commodity_type" | "broker_revenue" | "primary_driver_id" | "secondary_driver_id" |
    "truck_id" | "trailer_id" |
    "loading_type" | "unloading_type" | "is_trailer_required" |
    "pickup_address_line1" | "pickup_address_line2" | "pickup_city" | "pickup_state" |
    "pickup_date" | "pickup_zip_code" | "drop_off_address_line1" | "drop_off_address_line2" |
    "drop_off_city" | "drop_off_date" | "drop_off_state" | "drop_off_zip_code"
  >
  
export interface LoadStop {
  id: number

  load_id: number

  pickup_address_line1: string;
  pickup_address_line2?: string;
  pickup_city: string;
  pickup_state: string;
  pickup_zip_code: string;
  pickup_date: Date

  drop_off_address_line1: string;
  drop_off_address_line2?: string;
  drop_off_city: string;
  drop_off_state: string;
  drop_off_zip_code: string;
  drop_off_date: Date

  payout: number
  distance: number
  weight: number

  first_name: string;
  last_name: string;
  email: Email;
  phone_number: string;

  instructions?: string
}

export type LoadStopCreate = Omit<LoadStop, "id" | "load_id">
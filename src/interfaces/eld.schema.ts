export type EEldAlertEventType = "Clear" | "Obstructed Camera" | "Mobile Usage"
export type EEldAlertStatus = "Needs Review" | "Dismissed" | "Starred"
export type EEldDriverEntityDrivingStatus = "Clear" | "Driving" | "Sleep Beth"
export type EFuelType = "Clear" | "Diesel"
export type EEldTrailerEntityStatus = "Clear" | "No Gateway Peried"
export type EEldTruckEntityStatus = "Clear" | "Off" | "Moving"
export type Date = "2023-08-18"

export interface EldAlert {
  id: number

  event_type: EEldAlertEventType
  status: EEldAlertStatus

  video_time: string
  video_url: string

  driver_id: number
}

export interface EldDriverEntity {
  id: number

  driving_status: EEldDriverEntityDrivingStatus

  app_version: string
  os: string

  current_location_lat: string
  current_location_long: string
  current_location: string

  driver_id: number
  vehicle_id: number
}

export interface EldIftaDriver {
  id: number

  avg_mpg: string
  moving_mpg: string
  total_distance: string
  utilization: string
  driving: string
  idling: string
  fuel_cost: string
  est_empty_miles: string

  driver_id: number
}

export interface EldIftaFuelPurchase {
  id: number

  date: Date
  jurisdiction: string

  fuel_type: EFuelType
  volume: string
  cost: string
  vendor: string
  source: string

  vehicle_id: number
}

export interface EldIftaIdlingEvent {
  id: number

  start_date: Date

  total: string

  current_location_lat: string
  current_location_long: string
  current_location: string

  vehicle_id: number
  driver_id: number
}

export interface EldIftaSummary {
  id: number

  jurisdiction: string
  distance: string
  fuel: string

  vehicle_id: number
  driver_id: number
}

export interface EldIftaTripReport {
  id: number

  date: Date
  jurisdiction: string
  distance: string
  odo_start: string
  odo_end: string

  vehicle_id: number
}

export interface EldIftaVehicle {
  id: number

  avg_mpg: string
  moving_mpg: string
  total_distance: string
  utilization: string
  driving: string
  idling: string
  fuel_cost: string
  odometer: string
  fuel_type: EFuelType

  vehicle_id: number
}

export interface EldTrailerEntity {
  id: number

  status: EEldTrailerEntityStatus

  last_trip: string
  battary: string
  tags: string

  current_location_lat: string
  current_location_long: string
  current_location: string

  trailer_id: number
}

export interface EldTruckEntity {
  id: number

  status: EEldTruckEntityStatus

  last_trip: string
  current_fuel_level: string
  license_plate: string
  tags: string

  current_location_lat: string
  current_location_long: string
  current_location: string

  driver_id: number
  truck_id: number
}
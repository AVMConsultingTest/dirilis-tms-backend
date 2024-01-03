type EBool = "Yes" | "No"
type ECheckinCheckoutType = "In" | "Out"
type ECheckinCheckoutBinder = "Provided" | "Incomplete" | "NotProvided"

export interface CheckinCheckout {
  id: number

  type: ECheckinCheckoutType
  ifta_number: string
  ny_number: string
  binder: ECheckinCheckoutBinder

  ky_permit_current: EBool
  nv_permit_current: EBool
  nm_permit_current: EBool
  or_permit_current: EBool
  ct_permit_current: EBool

  valid_insurance: EBool
  registiration_current: EBool
  tablet_charger: EBool
  fuel_card: EBool
  mileage: string
  damage: string
  damage_type: string
  fleet_rep: string

  primary_driver_id: number
  secondary_driver_id: number
  truck_id: number
}

export type CheckinCheckoutCreate = Omit<CheckinCheckout, "id">
export type CheckinCheckoutUpdate = Partial<Omit<CheckinCheckout, "id">>
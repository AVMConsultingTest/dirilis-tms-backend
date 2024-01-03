type Date = "2023-08-18"

type EApplicantType = "Company Driver" | "Owner Driver" | "Lease Driver"
type EDriverSubstatus = "Ready" | "Covered" | "Enroute" | "Shop" | "Reserved" | "Dispatched" | "Home" | "Home for Load" | "Stop"
type ECdlType = "CDL (Back)" | "CDL (Front)"
type ECdlClass = "A Class" | "B Class" | "C Class"
type Email = "example@gmail.com"
type EDriverStatus = "Active" | "Terminated" | "On Vacation"

export interface Driver {
  id: number;

  avatar: number;
  first_name: string;
  last_name: string;
  ssn: string;
  dob: Date;
  email: Email;
  contact_phone_number: string;
  emergency_phone_number: string;
  emergency_phone_number_name: string;
  type: EApplicantType;
  w9_exist: boolean;
  is_restricted: boolean;
  restricted_notes?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  zip_code: string;
  employee_id: string;
  employee_type: string;
  notes?: string;
  account_number?: string;
  routing_number?: string;
  payment_type: string;
  payment_rates: number;
  tax_form: string;
  recurring_deductions: number;
  compensation: number;
  caption?: string;
  status: EDriverStatus
  substatus: EDriverSubstatus;
  score: number;
  hire_date: Date;
  next_drug_test_date?: Date;
  samba_id?: string;
  samba_license_id?: string;
  twic_card: boolean;
  twic_card_notes?: string;

  cdls: DriverCdl[]
}

export interface DriverCdl {
  id: number;

  type: ECdlType
  issued_state: string;
  number: string;
  class: ECdlClass
  expiration_date: Date;
  endorsement: string
  file: string

  completed_by: {
    name: string,
    is_owner: boolean
  }

  driver_id: number
}

export type DriverCdlCreate = Omit<DriverCdl, "id" | "driver_id" | "completed_by">
export type DriverCdlUpdate = Partial<Omit<DriverCdl, "id" | "driver_id">>

export type DriverCreate = Omit<Driver, "id" | "cdls" | "score" | "next_drug_test_date" | "samba_id" | "samba_license_id" | "substatus" | "status"> & {
  cdls: DriverCdlCreate[]
}
export type DriverUpdate = Partial<Omit<Driver, "id" | "cdls">>
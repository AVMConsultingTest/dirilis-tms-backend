type EBool = "Yes" | "No"
type Email = "example@gmail.com"

export interface BCustomer {
  id: number

  name: string
  dba_name: string
  sales_representative: string
  account_manager: string
  email: Email
  phone_number: string
  address_line1?: string;
  address_line2?: string;
  state?: string;
  city?: string;
  zip_code?: string;
  country?: string;

  bill_method: string
  bill_frequency: string
  shipment_type: string
  pod_required: EBool
  credit_limit: string
  payment_team: string

  bcustomer_contacts: BCustomerContact[]

}

export interface BCustomerContact {
  id: number

  name: string
  email: string
  phone_number: string
  role: string
}

export type BCustomerCreate = Omit<BCustomer, "id" | "bcustomer_contacts"> & {
  bcustomer_contacts: BCustomerContactCreate[]
}

export type BCustomerContactCreate = Omit<BCustomerContact, "id">

export type BCustomerUpdate = Partial<Omit<BCustomer, "id" | "bcustomer_contacts">>
export type BCustomerContactUpdate = Partial<Omit<BCustomerContact, "id">>

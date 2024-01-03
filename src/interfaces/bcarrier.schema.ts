type EBool = "Yes" | "No"
type Date = "2023-08-18"

export interface BCarrier {
  id: number

  name: string
  dba_name: string
  mc_number: string
  dot_number: string
  active_insurance: EBool
  insurance_expiration: Date
  cargo_coverage: string
  status: string
  home_base_city: string
  home_base_state: string
}

export type BCarrierCreate = Omit<BCarrier, "id">;
export type BCarrierUpdate = Partial<Omit<BCarrier, "id">>
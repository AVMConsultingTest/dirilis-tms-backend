type EFactoringStatus = "Pending" | "Open" | "Submitted" | "Received" | "Rejected"
type Date = "2023-08-18"

export interface Factoring {
  id: number

  shipper_name: string
  invoice_date: Date
  invoice_number: string
  reference_number: string
  invoice_amount: number
  notes?: string
  status: EFactoringStatus
}

export type FactoringCreate = Omit<Factoring, "id" | "status">
export type FactoringUpdate = Omit<Factoring, "id">
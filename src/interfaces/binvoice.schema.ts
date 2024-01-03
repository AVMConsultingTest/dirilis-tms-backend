type EBInvoicePayment = "Pending" | "Paid"
type EBInvoiceStatus = "Open" | "Created" | "Submitted" | "In Dispute"
type Date = "2023-08-18"

export interface BInvoice {
  id: number;

  title: string
  customer_name: string
  customer_address: string
  bill_to_name: string
  bill_to_address: string
  number: string
  date: Date
  credit_terms: string
  notes?: string

  customer_payment: EBInvoicePayment
  carrier_payment: EBInvoicePayment
  status: EBInvoiceStatus

  load_id: number
}

export type BInvoiceCreate = Omit<BInvoice, "id" | "customer_payment" | "carrier_payment" | "status">
export type BInvoiceUpdate = Partial<Omit<BInvoice, "id" | "load_id">>
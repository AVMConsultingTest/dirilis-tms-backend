export interface BQuote {
  id: number
  // load_id: number
  name: string
  origin: string
  destination: string
  pickup_time: Date
  delivery_time: Date
  cargo_type: string
  cargo_weight: string
  equipment_type: string
  quote: string
  customer_phone_number: string
  status: string
  // customer_email: string
}

export type BQuoteCreate = Omit<BQuote, "id">
export type BQuoteUpdate = Partial<Omit<BQuote, "id">>
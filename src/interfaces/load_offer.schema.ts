type ELoadOfferStatus = "Pending" | "Assigned" | "Declined"

export interface LoadOffer {
    id: number

    load_id: number
    carrier_id: number

    rate_per_mile: number
    all_in_rate: number

    notes?: string
    source: string

    joke_offer_rate: number
    kpi: number

    status: ELoadOfferStatus
}

export type LoadOfferCreate = Pick<LoadOffer, "load_id" | "rate_per_mile" | "all_in_rate" | "notes" | "kpi">

export type LoadOfferUpdate = Pick<LoadOffer, "status">
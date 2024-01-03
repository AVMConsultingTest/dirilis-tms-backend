type EBool = "Yes" | "No"
type Date = "2023-08-18"


export interface Permit {
    id: number;
    type: string;
    number: string;
    duration: string;
    start_date: Date;
    end_date: Date;
    purchased_date: Date;
    cost: number;
    delivery_status: string;
    vendor_url: string;
    installed: EBool;
    notes: string;

    truck_id: number;
}

export type PermitCreate = Omit<Permit, "id">
export type PermitUpdate = Partial<Omit<Permit, "id">>

export type PermitSummary = {
    type1: number
    type2: number
}
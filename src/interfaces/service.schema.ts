type EServiceVehicleType = "Truck" | "Trailer"
type Date = "2023-08-18"

export interface Service {
    id: number

    vehicle_id: number
    vehicle_type: EServiceVehicleType
    vehicle_status: string

    type: string;

    dot_inspection_number: string;
    repair_start_date?: Date;
    repair_completion_date?: Date;
    repair_description: string;
    repair_facility?: string;

    notes?: string;

    driver_id: number;
    vendor_id: number;
}

export type ServiceCreate = Omit<Service, "id" | "vehicle_status">
export type ServiceUpdate = Partial<Omit<Service, "id" | "vehicle_status">>

export type ServiceSummary = {
    type1: number
    type2: number
}
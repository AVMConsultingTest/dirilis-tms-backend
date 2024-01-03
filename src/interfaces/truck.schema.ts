import { ETruckStatus, EVehicleOwnershipType } from "../types";

export interface ITruck {
    id: number;
    unit_number: string;
    status: ETruckStatus;
    brand: string;
    model: string;
    year: string;
    color: string;
    plate: string;
    make: string;
    fuel_type: string;
    gross_weight: string;
    number_of_axles: number;
    vin_number: string;
    ownership_type: EVehicleOwnershipType;
    owner_driver_id?: number;
    notes: string;
}
  
export type ITruckCreate = Omit<ITruck, "id">
  
export type ITruckUpdate = Partial<Omit<ITruck, "id">>
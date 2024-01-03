type ETrailerStatus = "Enroute" | "Ready" | "InShop" | "InTerminal"

export interface ITrailer {
    unit_number: string;
    status: ETrailerStatus;
    brand: string;
    model: string;
    color: string;
    year: string;
    plate: string;
    ownership_type: string;
    owner_driver_id?: number;
    length: string;
    width: string;
    height: string;
    capacity: string;
    vin_number: string;
    notes: string;
}
  
export type ITrailerCreate = Omit<ITrailer, "id">
export type ITrailerUpdate = Partial<Omit<ITrailerCreate, "">>
  
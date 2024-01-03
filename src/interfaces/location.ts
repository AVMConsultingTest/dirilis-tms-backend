import { ELocationStatus } from "../types";

export interface ILocationSwagger {
    id: number;
    name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    zip_code: string;

    status: ELocationStatus;
}

export type ILocationCreateSwagger = Omit<ILocationSwagger, "id">;
export type ILocationUpdateSwagger = Partial<ILocationCreateSwagger>;
import { ECadence, EEmployeeType, ETrainingStatus, ETrainingType } from "../types";

export interface ITraining {
    id: number
  
    employee_type: EEmployeeType;
    type: ETrainingType;
    description: string;
    cadence: ECadence;
    completion_date?: Date;
    status: ETrainingStatus;
  
    driver_id: number;

}
  
export type ITrainingCreate = Omit<ITraining, "id">
export type ITrainingUpdate = Partial<Omit<ITrainingCreate, "carrier_id">>
  
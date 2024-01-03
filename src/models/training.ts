import { Table, Column, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { ECadence, EEmployeeType, ETrainingStatus, ETrainingType } from "../types";
import { Company, ICompany } from "./company";
import { Driver, IDriver } from "./driver";

export interface ITraining {
  id: number

  employee_type: EEmployeeType;
  type: ETrainingType;
  description: string;
  cadence: ECadence;
  completion_date?: Date;
  status: ETrainingStatus;

  carrier_id: number;
  driver_id: number;

  created_at?: Date
  updated_at?: Date
}

export type ITrainingCreate = Omit<ITraining, "id">
export type ITrainingUpdate = Partial<Omit<ITrainingCreate, "carrier_id">>

@Table({ timestamps: true, underscored: true, tableName: "Trainings", createdAt: "created_at", updatedAt: "updated_at" })
export class Training extends Model<ITraining, ITrainingCreate> {
  @Column({ allowNull: false, defaultValue: EEmployeeType.Driver }) employee_type!: EEmployeeType;
  @Column({ allowNull: false, defaultValue: ETrainingType.Road }) type!: ETrainingType;
  @Column({ allowNull: false }) description: string;
  @Column({ allowNull: false, defaultValue: ECadence.OneTime }) cadence!: ECadence;
  @Column({ allowNull: true }) completion_date!: Date;
  @Column({ allowNull: false, defaultValue: ETrainingStatus.Pending }) status!: ETrainingStatus;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;

  @ForeignKey(() => Driver) @Column({ allowNull: false }) driver_id!: number;
  @BelongsTo(() => Driver) driver: IDriver;
}
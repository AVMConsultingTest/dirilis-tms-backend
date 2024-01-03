import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { EEldDriverEntityDrivingStatus } from "../types";
import { Driver, IDriver, Truck, ITruck, Company, ICompany } from ".";

export interface IEldDriverEntity {
    id: number

    driving_status: EEldDriverEntityDrivingStatus

    app_version: string
    os: string
    
    current_location_lat: string
    current_location_long: string
    current_location: string

    driver_id: number
    carrier_id: number
    vehicle_id: number

    created_at?: Date
    updated_at?: Date
}

export type IEldDriverEntityCreate = Omit<IEldDriverEntity, "id" | "created_at" | "updated_at">
export type IEldDriverEntityUpdate = Partial<Omit<IEldDriverEntityCreate, "carrier_id">>

@Table({ tableName: "EldDriverEntities", underscored: true, createdAt: "created_at", updatedAt: "updated_at" })
export class EldDriverEntity extends Model<IEldDriverEntity, IEldDriverEntityCreate> {
  @Column({ allowNull: false }) driving_status: EEldDriverEntityDrivingStatus;

  @Column({ allowNull: false }) app_version: string;
  @Column({ allowNull: false }) os: string;
    
  @Column({ allowNull: true }) current_location_lat: string;
  @Column({ allowNull: true }) current_location_long: string;
  @Column({ allowNull: true }) current_location: string;

  @ForeignKey(() => Driver) @Column({ allowNull: false }) driver_id!: number;
  @BelongsTo(() => Driver) driver: IDriver;

  @ForeignKey(() => Truck) @Column({ allowNull: true }) vehicle_id!: number;
  @BelongsTo(() => Truck) vehicle: ITruck;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;
}
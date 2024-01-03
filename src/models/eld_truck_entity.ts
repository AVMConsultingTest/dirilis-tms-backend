import { Table, Column, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { EEldTruckEntityStatus } from "../types";
import { Company, ICompany, Truck, ITruck, Driver, IDriver } from ".";

export interface IEldTruckEntity {
  id: number

  status: EEldTruckEntityStatus

  last_trip: string
  current_fuel_level: string
  license_plate: string
  tags: string

  current_location_lat: string
  current_location_long: string
  current_location: string

  driver_id: number
  truck_id: number
  carrier_id: number

  created_at?: Date
  updated_at?: Date
}

export type IEldTruckEntityCreate = Omit<IEldTruckEntity, "id" | "created_at" | "updated_at">
export type IEldTruckEntityUpdate = Partial<Omit<IEldTruckEntityCreate, "carrier_id">>

@Table({ tableName: "EldTruckEntities", underscored: true, createdAt: "created_at", updatedAt: "updated_at" })
export class EldTruckEntity extends Model<IEldTruckEntity, IEldTruckEntityCreate> {
  @Column({ allowNull: false }) status: EEldTruckEntityStatus;

  @Column({ allowNull: false }) current_fuel_level: string;
  @Column({ allowNull: false }) license_plate: string;
  @Column({ allowNull: false }) last_trip: string;
  @Column({ allowNull: false }) tags: string;

  @Column({ allowNull: true }) current_location_lat: string;
  @Column({ allowNull: true }) current_location_long: string;
  @Column({ allowNull: true }) current_location: string;

  @ForeignKey(() => Driver) @Column({ allowNull: true }) driver_id!: number;
  @BelongsTo(() => Driver) driver: IDriver;

  @ForeignKey(() => Truck) @Column({ allowNull: true }) truck_id!: number;
  @BelongsTo(() => Truck) truck: ITruck;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;
}
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company, Driver, ICompany, IDriver, ITruck, Truck } from ".";

export interface IEldIftaIdlingEvent {
  id: number

  start_date: Date

  total: string

  current_location_lat: string
  current_location_long: string
  current_location: string

  vehicle_id: number
  carrier_id: number
  driver_id: number

  created_at?: Date
  updated_at?: Date
}

export type IEldIftaIdlingEventCreate = Omit<IEldIftaIdlingEvent, "id" | "created_at" | "updated_at">
export type IEldIftaIdlingEventUpdate = Omit<IEldIftaIdlingEventCreate, "carrier_id">

@Table({ tableName: "EldIftaIdlingEvents", underscored: true, createdAt: "created_at", updatedAt: "updated_at" })
export class EldIftaIdlingEvent extends Model<IEldIftaIdlingEvent, IEldIftaIdlingEventCreate> {
  @Column({ allowNull: false }) start_date: Date;

  @Column({ allowNull: false }) total: string;

  @Column({ allowNull: false }) current_location_lat: string;
  @Column({ allowNull: false }) current_location_long: string;
  @Column({ allowNull: false }) current_location: string;

  @ForeignKey(() => Driver) @Column({ allowNull: false }) driver_id!: number;
  @BelongsTo(() => Driver) driver: IDriver;

  @ForeignKey(() => Truck) @Column({ allowNull: true }) vehicle_id!: number;
  @BelongsTo(() => Truck) vehicle: ITruck;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;
}
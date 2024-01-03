import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company, ICompany, Truck, ITruck } from ".";
import { EFuelType } from "../types";

export interface IEldIftaVehicle {
  id: number

  avg_mpg: string
  moving_mpg: string
  total_distance: string
  utilization: string
  driving: string
  idling: string
  fuel_cost: string
  odometer: string
  fuel_type: EFuelType

  vehicle_id: number
  carrier_id: number

  created_at?: Date
  updated_at?: Date
}

export type IEldIftaVehicleCreate = Omit<IEldIftaVehicle, "id" | "created_at" | "updated_at">
export type IEldIftaVehicleUpdate = Partial<Omit<IEldIftaVehicleCreate, "carrier_id">>


@Table({ tableName: "EldIftaVehicles", underscored: true, createdAt: "created_at", updatedAt: "updated_at" })
export class EldIftaVehicle extends Model<IEldIftaVehicle, IEldIftaVehicleCreate> {
  @Column({ allowNull: false }) avg_mpg: string;
  @Column({ allowNull: false }) moving_mpg: string;
  @Column({ allowNull: false }) total_distance: string;
  @Column({ allowNull: false }) utilization: string;
  @Column({ allowNull: false }) driving: string;
  @Column({ allowNull: false }) idling: string;
  @Column({ allowNull: false }) fuel_cost: string;
  @Column({ allowNull: false }) odometer: string;
  @Column({ allowNull: false }) fuel_type: EFuelType;

  @ForeignKey(() => Truck) @Column({ allowNull: true }) vehicle_id!: number;
  @BelongsTo(() => Truck) vehicle: ITruck;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;
}
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { EFuelType } from "../types";
import { Company, ICompany, ITruck, Truck } from ".";

export interface IEldIftaFuelPurchase {
  id: number

  date: Date
  jurisdiction: string

  fuel_type: EFuelType
  volume: string
  cost: string
  vendor: string
  source: string

  vehicle_id: number
  carrier_id: number

  created_at?: Date
  updated_at?: Date
}

export type IEldIftaFuelPurchaseCreate = Omit<IEldIftaFuelPurchase, "id" | "created_at" | "updated_at">
export type IEldIftaFuelPurchaseUpdate = Omit<IEldIftaFuelPurchaseCreate, "carrier_id">

@Table({ tableName: "EldIftaFuelPurchases", underscored: true, createdAt: "created_at", updatedAt: "updated_at" })
export class EldIftaFuelPurchase extends Model<IEldIftaFuelPurchase, IEldIftaFuelPurchaseCreate> {
  @Column({ allowNull: false }) date: Date;
  @Column({ allowNull: false }) jurisdiction: string;

  @Column({ allowNull: false }) fuel_type: EFuelType;
  @Column({ allowNull: false }) volume: string;
  @Column({ allowNull: false }) cost: string;
  @Column({ allowNull: false }) vendor: string;
  @Column({ allowNull: false }) source: string;

  @ForeignKey(() => Truck) @Column({ allowNull: true }) vehicle_id!: number;
  @BelongsTo(() => Truck) vehicle: ITruck;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;
}
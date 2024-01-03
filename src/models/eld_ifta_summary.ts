import { Table, Model, Column, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Company, Driver, ICompany, IDriver, ITruck, Truck } from ".";

export interface IEldIftaSummary {
  id: number

  jurisdiction: string
  distance: string
  fuel: string

  carrier_id: number
  vehicle_id: number
  driver_id: number

  created_at?: Date
  updated_at?: Date
}

export type IEldIftaSummaryCreate = Omit<IEldIftaSummary, "id" | "created_at" | "updated_at">
export type IEldIftaSummaryUpdate = Partial<Omit<IEldIftaSummaryCreate, "carrier_id">>


@Table({ tableName: "EldIftaSummaries", underscored: true, createdAt: "created_at", updatedAt: "updated_at" })
export class EldIftaSummary extends Model<IEldIftaSummary, IEldIftaSummaryCreate> {
  @Column({ allowNull: false }) jurisdiction: string;
  @Column({ allowNull: false }) distance: string;
  @Column({ allowNull: false }) fuel: string;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;

  @ForeignKey(() => Driver) @Column({ allowNull: false }) driver_id!: number;
  @BelongsTo(() => Driver) driver: IDriver;

  @ForeignKey(() => Truck) @Column({ allowNull: true }) vehicle_id!: number;
  @BelongsTo(() => Truck) vehicle: ITruck;
}
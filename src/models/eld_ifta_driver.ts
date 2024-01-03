import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company, Driver, ICompany, IDriver } from ".";

export interface IEldIftaDriver {
  id: number

  avg_mpg: string
  moving_mpg: string
  total_distance: string
  utilization: string
  driving: string
  idling: string
  fuel_cost: string
  est_empty_miles: string

  driver_id: number
  carrier_id: number

  created_at?: Date
  updated_at?: Date
}

export type IEldIftaDriverCreate = Omit<IEldIftaDriver, "id" | "created_at" | "updated_at">
export type IEldIftaDriverUpdate = Partial<Omit<IEldIftaDriverCreate, "carrier_id">>

@Table({ tableName: "EldIftaDrivers", underscored: true, createdAt: "created_at", updatedAt: "updated_at" })
export class EldIftaDriver extends Model<IEldIftaDriver, IEldIftaDriverCreate> {
  @Column({ allowNull: false }) avg_mpg: string;
  @Column({ allowNull: false }) moving_mpg: string;
  @Column({ allowNull: false }) total_distance: string;
  @Column({ allowNull: false }) utilization: string;
  @Column({ allowNull: false }) driving: string;
  @Column({ allowNull: false }) idling: string;
  @Column({ allowNull: false }) fuel_cost: string;
  @Column({ allowNull: false }) est_empty_miles: string;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;

  @ForeignKey(() => Driver) @Column({ allowNull: true }) driver_id!: number;
  @BelongsTo(() => Driver) driver: IDriver;
}
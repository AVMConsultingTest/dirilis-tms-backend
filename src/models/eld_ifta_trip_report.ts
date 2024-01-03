import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company, ICompany, ITruck, Truck } from ".";

export interface IEldIftaTripReport {
  id: number

  date: Date
  jurisdiction: string
  distance: string
  odo_start: string
  odo_end: string

  vehicle_id: number
  carrier_id: number

  created_at?: Date
  updated_at?: Date
}

export type IEldIftaTripReportCreate = Omit<IEldIftaTripReport, "id" | "created_at" | "updated_at">
export type IEldIftaTripReportUpdate = Omit<IEldIftaTripReportCreate, "carrier_id">

@Table({ tableName: "EldIftaTripReports", underscored: true, createdAt: "created_at", updatedAt: "updated_at" })
export class EldIftaTripReport extends Model<IEldIftaTripReport, IEldIftaTripReportCreate> {
  @Column({ allowNull: false }) date: Date;
  @Column({ allowNull: false }) jurisdiction: string;
  @Column({ allowNull: false }) distance: string;
  @Column({ allowNull: false }) odo_start: string;
  @Column({ allowNull: false }) odo_end: string;

  @ForeignKey(() => Truck) @Column({ allowNull: true }) vehicle_id!: number;
  @BelongsTo(() => Truck) vehicle: ITruck;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;
}
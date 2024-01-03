import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Driver, IDriver } from "./driver";
import { Company, ICompany } from "./company";

export interface IInspection {
  id: number;
  carrier_id: number;
  driver_id: number;

  category: string;
  date: Date;
  state: string;
  report_number: string;
  inspection_level: number;
  violation_group: string;
  description: string;
  violations_count: number;
  sequence: number;
  out_of_service: string;
  violation_severity: number;
  oos_violation_severity: number;
  total_violation_severity: number;
  time_weight: number;
  total_points: number;

  created_at?: Date;
  updated_at?: Date;
}

export type IInspectionCreate = Omit<IInspection, "id">
export type IInspectionUpdate = Partial<Omit<IInspectionCreate, "carrier_id">>

@Table({ timestamps: true, underscored: true, tableName: "Inspections", createdAt: "created_at", updatedAt: "updated_at" })
export class Inspection extends Model<Inspection, IInspection> {
  @Column({ allowNull: false }) category: string;
  @Column({ allowNull: false }) date: Date;
  @Column({ allowNull: false }) state: string;
  @Column({ allowNull: false }) report_number: string;
  @Column inspection_level: number | null;
  @Column violation_group: string | null;
  @Column description: string | null;
  @Column violations_count: number | null;
  @Column sequence: number | null;
  @Column out_of_service: string | null;
  @Column violation_severity: number | null;
  @Column oos_violation_severity: number | null;
  @Column total_violation_severity: number | null;
  @Column time_weight: number | null;
  @Column total_points: number | null;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;

  @ForeignKey(() => Driver) @Column({ allowNull: false }) driver_id!: number;
  @BelongsTo(() => Driver) driver: IDriver;
}

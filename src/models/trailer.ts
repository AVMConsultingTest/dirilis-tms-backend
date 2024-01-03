import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Company, ICompany } from "./company";
import { ETrailerStatus } from "../types";

export interface ITrailer {
  id: number;

  unit_number: string;
  status: ETrailerStatus;
  brand: string;
  model: string;
  color: string;
  year: string;
  plate: string;
  ownership_type: string;
  owner_driver_id?: number;
  length: string;
  width: string;
  height: string;
  capacity: string;
  vin_number: string;
  notes: string;

  carrier_id: number;

  created_at?: Date
  updated_at?: Date
}

export type ITrailerCreate = Omit<ITrailer, "id">
export type ITrailerUpdate = Partial<Omit<ITrailerCreate, "carrier_id">>

@Table({ timestamps: true, underscored: true, tableName: "Trailers", createdAt: "created_at", updatedAt: "updated_at" })
export class Trailer extends Model<ITrailer, ITrailerCreate> {
  @Column({ allowNull: false }) unit_number!: string;
  @Column({ allowNull: false }) status!: ETrailerStatus;
  @Column({ allowNull: false }) brand!: string;
  @Column({ allowNull: false }) model!: string;
  @Column({ allowNull: false }) color!: string;
  @Column({ allowNull: false }) year!: string;
  @Column({ allowNull: false }) plate!: string;
  @Column({ allowNull: false }) ownership_type!: string;
  @Column({ allowNull: true }) owner_driver_id!: number;
  @Column({ allowNull: false }) length!: string;
  @Column({ allowNull: false }) width!: string;
  @Column({ allowNull: false }) height!: string;
  @Column({ allowNull: false }) capacity!: string;
  @Column({ allowNull: false }) vin_number!: string;
  @Column({ allowNull: false }) notes!: string;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;
}
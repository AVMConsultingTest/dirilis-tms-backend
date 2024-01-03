import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { EFactoringStatus } from "../types";
import { Company, ICompany } from ".";

export interface IFactoring {
  id: number

  shipper_name: string
  invoice_date: Date
  invoice_number: string
  reference_number: string
  invoice_amount: number
  notes?: string
  status: EFactoringStatus

  carrier_id: number

  created_at?: Date
  updated_at?: Date
}

export type IFactoringCreate = Omit<IFactoring, "id" | "created_at" | "updated_at">
export type IFactoringUpdate = Partial<Omit<IFactoringCreate, "carrier_id">>

@Table({ timestamps: true, underscored: true, tableName: "Factoring", createdAt: "created_at", updatedAt: "updated_at" })
export class Factoring extends Model<IFactoring, IFactoringCreate> {
  @Column({ allowNull: false }) shipper_name: string;
  @Column({ allowNull: false }) invoice_date: Date;
  @Column({ allowNull: false }) invoice_number: string;
  @Column({ allowNull: false }) reference_number: string;
  @Column({ allowNull: false }) invoice_amount: number;
  @Column({ allowNull: true }) notes?: string;
  @Column({ allowNull: false, defaultValue: EFactoringStatus.Open }) status: EFactoringStatus;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;
}
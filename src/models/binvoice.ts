import { Table, Column, ForeignKey,  Model, BelongsTo } from "sequelize-typescript";
import { EBInvoicePayment, EBInvoiceStatus } from "../types";
import { Company, ICompany, Load, ILoad } from ".";

export interface IBInvoice {
  id: number;

  title: string
  customer_name: string
  customer_address: string
  bill_to_name: string
  bill_to_address: string
  number: string
  date: Date
  credit_terms: string
  notes?: string

  customer_payment: EBInvoicePayment
  carrier_payment: EBInvoicePayment
  status: EBInvoiceStatus

  broker_id: number
  load_id: number

  created_at?: Date;
  updated_at?: Date;
}

export type IBInvoiceCreate = Omit<IBInvoice, "id" | "created_at" | "updated_at">
export type IBInvoiceUpdate = Partial<Omit<IBInvoiceCreate, "broker_id">>

@Table({ timestamps: true, underscored: true, tableName: "BInvoices", createdAt: "created_at", updatedAt: "updated_at" })
export class BInvoice extends Model<IBInvoice, IBInvoiceCreate> {
  @Column({ allowNull: false }) title: string;
  @Column({ allowNull: false }) customer_name: string;
  @Column({ allowNull: false }) customer_address: string;
  @Column({ allowNull: false }) bill_to_name: string;
  @Column({ allowNull: false }) bill_to_address: string;
  @Column({ allowNull: false }) number: string;
  @Column({ allowNull: false }) date: Date;
  @Column({ allowNull: false }) credit_terms: string;
  @Column({ allowNull: true }) notes?: string;

  @Column({ allowNull: false, defaultValue: EBInvoicePayment.Pending }) customer_payment: EBInvoicePayment;
  @Column({ allowNull: false, defaultValue: EBInvoicePayment.Pending }) carrier_payment: EBInvoicePayment;
  @Column({ allowNull: false, defaultValue: EBInvoiceStatus.Created }) status: EBInvoiceStatus;

  @ForeignKey(() => Company) @Column({ allowNull: false }) broker_id: number;
  @BelongsTo(() => Company) broker!: ICompany;

  @ForeignKey(() => Load) @Column({ allowNull: false }) load_id: number;
  @BelongsTo(() => Load) load!: ILoad;
}
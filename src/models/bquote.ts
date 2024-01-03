import { Table, Column, ForeignKey, Model, BelongsTo } from "sequelize-typescript";
import { Company, ICompany } from ".";

export interface IBQuote {
  id: number

  name: string
  origin: string
  destination: string
  pickup_time: Date
  delivery_time: Date
  cargo_type: string
  cargo_weight: string
  equipment_type: string
  quote: string
  status: string
  // load_id: number
  customer_phone_number: number
  // customer_email: string
  broker_id: number

  created_at?: Date;
  updated_at?: Date;
}

export type IBQuoteCreate = Omit<IBQuote, "id" | "created_at" | "updated_at">
export type IBQuoteUpdate = Partial<Omit<IBQuoteCreate, "broker_id">>

@Table({ timestamps: true, underscored: true, tableName: "BQuotes", createdAt: "created_at", updatedAt: "updated_at" })
export class BQuote extends Model<IBQuote, IBQuoteCreate> {
  @Column({ allowNull: false }) name: string;
  @Column({ allowNull: false }) origin: string;
  @Column({ allowNull: false }) destination: string;
  @Column({ allowNull: false }) pickup_time: Date;
  @Column({ allowNull: false }) delivery_time: Date;
  @Column({ allowNull: false }) cargo_type: string;
  @Column({ allowNull: false }) cargo_weight: string;
  @Column({ allowNull: false }) customer_phone_number: number;
  // @Column({ allowNull: false }) customer_email: string;
  @Column({ allowNull: false }) equipment_type: string;
  // @Column({ allowNull: false }) load_id: string;
  @Column({ allowNull: false }) quote: string;

  @Column({ allowNull: false }) status: string;

  @ForeignKey(() => Company) @Column({ allowNull: false }) broker_id: number;
  @BelongsTo(() => Company) broker!: ICompany;
}
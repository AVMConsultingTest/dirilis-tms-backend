import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { EBool } from "../types";
import { IBCustomerContact, Company, ICompany, BCustomerContact } from ".";

export interface IBCustomer {
  id: number

  name: string
  dba_name: string
  sales_representative: string
  account_manager: string
  email: string
  phone_number: string
  address_line1?: string;
  address_line2?: string;
  state?: string;
  city?: string;
  zip_code?: string;
  country?: string;

  bill_method: string
  bill_frequency: string
  shipment_type: string
  pod_required: EBool
  credit_limit: string
  payment_team: string

  broker_id: number

  bcustomer_contacts: IBCustomerContact[]

  created_at?: Date
  updated_at?: Date
}

export type IBCustomerCreate = Omit<IBCustomer, "id" | "created_at" | "updated_at" | "bcustomer_contacts">
export type IBCustomerUpdate = Partial<Omit<IBCustomerCreate, "broker_id">>

@Table({ timestamps: true, underscored: true, tableName: "BCustomers", createdAt: "created_at", updatedAt: "updated_at" })
export class BCustomer extends Model<IBCustomer, IBCustomerCreate> {
  @Column({ allowNull: false }) name: string;
  @Column({ allowNull: false }) dba_name: string;
  @Column({ allowNull: false }) sales_representative: string;
  @Column({ allowNull: false }) account_manager: string;
  @Column({ allowNull: false }) email: string;
  @Column({ allowNull: false }) phone_number: string;
  @Column({ allowNull: false }) address_line1?: string;
  @Column({ allowNull: false }) address_line2?: string;
  @Column({ allowNull: false }) state?: string;
  @Column({ allowNull: false }) city?: string;
  @Column({ allowNull: false }) zip_code?: string;
  @Column({ allowNull: false }) country?: string;

  @Column({ allowNull: false }) bill_method: string;
  @Column({ allowNull: false }) bill_frequency: string;
  @Column({ allowNull: false }) shipment_type: string;
  @Column({ allowNull: false }) pod_required: EBool;
  @Column({ allowNull: false }) credit_limit: string;
  @Column({ allowNull: false }) payment_team: string;

  @ForeignKey(() => Company) @Column({ allowNull: false }) broker_id: number;
  @BelongsTo(() => Company) broker!: ICompany;

  @HasMany(() => BCustomerContact) bcustomer_contacts: IBCustomerContact[];
}
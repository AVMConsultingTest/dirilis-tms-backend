import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company, ICompany, BCustomer } from ".";

export interface IBCustomerContact {
  id: number

  name: string
  email: string
  phone_number: string
  role: string

  broker_id: number
  bcustomer_id: number

  created_at?: Date
  updated_at?: Date
}

export type IBCustomerContactCreate = Omit<IBCustomerContact, "id" | "created_at" | "updated_at">
export type IBCustomerContactUpdate = Partial<Omit<IBCustomerContactCreate, "broker_id">>

@Table({ timestamps: true, underscored: true, tableName: "BCustomerContacts", createdAt: "created_at", updatedAt: "updated_at" })
export class BCustomerContact extends Model<IBCustomerContact, IBCustomerContactCreate> {
  @Column({ allowNull: false }) name: string;
  @Column({ allowNull: false }) email: string;
  @Column({ allowNull: false }) phone_number: string;
  @Column({ allowNull: false }) role: string;

  @ForeignKey(() => Company) @Column({ allowNull: false }) broker_id: number;
  @BelongsTo(() => Company) broker!: ICompany;

  @ForeignKey(() => BCustomer) @Column({ allowNull: false }) bcustomer_id: number;
  @BelongsTo(() => BCustomer) bcustomer!: ICompany;
}
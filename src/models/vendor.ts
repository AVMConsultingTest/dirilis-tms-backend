import { Table, Column, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { EVendorStatus } from "../types";
import { Company, ICompany } from "./company";
export interface IVendor {
  id: number;
  name: string;
  contact_name: string;
  email: string;
  phone_number: string;
  address_line1: string;
  address_line2: string;
  state: string;
  city: string;
  zip_code: string;
  country: string;
  business_hours: string;
  line_of_business: string;
  status: EVendorStatus;
  account_number: string;
  bank_name: string;
  routing_number: string;
  carrier_id: number;

  created_at?: Date;
  updated_at?: Date;
}

export type IVendorCreate = Omit<IVendor, "id">
export type IVendorUpdate = Partial<Omit<IVendorCreate, "carrier_id">>

@Table({ timestamps: true, underscored: true, tableName: "Vendors", createdAt: "created_at", updatedAt: "updated_at" })
export class Vendor extends Model<IVendor, IVendorCreate> {
  @Column({ allowNull: false, unique: true }) name!: string;
  @Column({ allowNull: false }) contact_name!: string;
  @Column({ allowNull: false, unique: true }) email!: string;
  @Column({ allowNull: false, unique: true }) phone_number!: string;
  @Column({ allowNull: false }) address_line1!: string;
  @Column({ allowNull: true }) address_line2!: string;
  @Column({ allowNull: false }) state!: string;
  @Column({ allowNull: false }) city!: string;
  @Column({ allowNull: false }) zip_code!: string;
  @Column({ allowNull: false }) country!: string;
  @Column({ allowNull: false }) business_hours!: string;
  @Column({ allowNull: false }) line_of_business!: string;
  @Column({ allowNull: false }) status!: EVendorStatus;
  @Column({ allowNull: false }) account_number!: string;
  @Column({ allowNull: false }) bank_name!: string;
  @Column({ allowNull: false }) routing_number!: string;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;
}
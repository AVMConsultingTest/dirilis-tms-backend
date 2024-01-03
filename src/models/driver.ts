import { Table, Column, DataType, Model, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { EApplicantType, EBool, EDriverStatus, EDriverSubstatus } from "../types";
import { Company, ICompany } from "./company";
import { ITruck, Truck } from "./truck";
import { Trailer } from "./trailer";
import { Cdl } from "./cdl";

export interface IDriver {
  id: number;

  avatar: number;
  first_name: string;
  last_name: string;
  name: string;
  
  ssn: string;
  dob: Date;
  email: string;
  contact_phone_number: string;
  emergency_phone_number: string;
  emergency_phone_number_name: string;
  type: EApplicantType;
  w9_exist: boolean;
  is_restricted: EBool;
  restricted_notes?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  zip_code: string;
  employee_id: string;
  employee_type: string;
  notes?: string;
  account_number?: string;
  routing_number?: string;
  payment_type: string;
  payment_rates: number;
  tax_form: string;
  recurring_deductions: number;
  compensation: number;
  caption?: string;
  status: EDriverStatus
  substatus: EDriverSubstatus;
  score: number;
  hire_date: Date;
  next_drug_test_date?: Date;
  samba_id?: string;
  samba_license_id?: string;
  twic_card: boolean;
  twic_card_notes?: string;

  carrier_id: number;
  truck_id?: number;
  trailer_id?: number;

  created_at?: Date
  updated_at?: Date
}

export type IDriverCreate = Omit<IDriver, "id | carrier_id | truck_id | trailer_id | samba_id | samba_license_id | next_drug_test_date | hire_date | score | status ">
export type IDriverUpdate = Partial<Omit<IDriverCreate, " | samba_id | samba_license_id">>

@Table({ timestamps: true, underscored: true, tableName: "Drivers", createdAt: "created_at", updatedAt: "updated_at" })
export class Driver extends Model<IDriver, IDriverCreate> {
  @Column({ allowNull: true }) avatar!: number;
  @Column({ allowNull: false }) first_name!: string;
  @Column({ allowNull: false }) last_name!: string;
  @Column({ allowNull: false }) ssn!: string;
  @Column({ allowNull: false }) dob!: Date;
  @Column({ allowNull: false }) email!: string;
  @Column({ allowNull: false }) contact_phone_number!: string;
  @Column({ allowNull: false }) emergency_phone_number!: string;
  @Column({ allowNull: false }) emergency_phone_number_name!: string;
  @Column({ allowNull: false }) type!: EApplicantType;
  @Column({ allowNull: false }) w9_exist!: boolean;
  @Column({ allowNull: false }) is_restricted!: boolean;
  @Column({ allowNull: false, type: DataType.TEXT }) restricted_notes!: string;
  @Column({ allowNull: false }) address_line_1!: string;
  @Column({ allowNull: true }) address_line_2!: string;
  @Column({ allowNull: false }) city!: string;
  @Column({ allowNull: false }) state!: string;
  @Column({ allowNull: false }) zip_code!: string;
  @Column({ allowNull: true }) employee_id!: string;
  @Column({ allowNull: true }) employee_type!: string;
  @Column({ allowNull: true, type: DataType.TEXT }) notes!: string;
  @Column({ allowNull: false }) account_number!: string;
  @Column({ allowNull: false }) routing_number!: string;
  @Column({ allowNull: false }) payment_type!: string;
  @Column(DataType.DECIMAL(10, 2)) payment_rates!: number;
  @Column({ allowNull: false }) tax_form!: string;
  @Column(DataType.DECIMAL(10, 2)) recurring_deductions!: number;
  @Column(DataType.DECIMAL(10, 2)) compensation!: number;
  @Column(DataType.TEXT) caption!: string;
  @Column({ defaultValue: EDriverStatus.Active }) status!: EDriverStatus;
  @Column({ defaultValue: EDriverSubstatus.Ready }) substatus: EDriverSubstatus;
  @Column({ defaultValue: 0 }) score!: number;
  @Column({ allowNull: false, type: DataType.DATEONLY, defaultValue: DataType.NOW }) hire_date!: Date;
  @Column({ allowNull: true, type: DataType.DATEONLY }) next_drug_test_date!: Date;
  @Column({ allowNull: true }) samba_id!: string;
  @Column({ allowNull: true }) samba_license_id!: string;
  @Column({ allowNull: false }) twic_card!: boolean;
  @Column({ allowNull: true, type: DataType.TEXT }) twic_card_notes!: string;

  @ForeignKey(() => Truck) @Column({ allowNull: true }) truck_id!: number;
  @BelongsTo(() => Truck) truck: ITruck;

  @ForeignKey(() => Trailer) @Column({ allowNull: true }) trailer_id!: number;
  @BelongsTo(() => Trailer) trailer: ITruck;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;

  @HasMany(() => Cdl, { as: "cdls" }) cdls: Cdl[];

}

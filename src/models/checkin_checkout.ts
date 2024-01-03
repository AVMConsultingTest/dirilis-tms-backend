import { Table, ForeignKey, Column, Model, BelongsTo } from "sequelize-typescript";
import { EBool, ECheckinCheckoutBinder, ECheckinCheckoutType } from "../types";
import { Company, Driver, ICompany, IDriver, ITruck, Truck } from ".";

export interface ICheckinCheckout {
  id: number

  type: ECheckinCheckoutType
  ifta_number: string
  ny_number: string
  binder: ECheckinCheckoutBinder

  ky_permit_current: EBool
  nv_permit_current: EBool
  nm_permit_current: EBool
  or_permit_current: EBool
  ct_permit_current: EBool

  valid_insurance: EBool
  registiration_current: EBool
  tablet_charger: EBool
  fuel_card: EBool
  mileage: string
  damage: string
  damage_type: string
  fleet_rep: string

  carrier_id: number
  primary_driver_id: number
  secondary_driver_id: number
  truck_id: number

  created_at?: Date;
  updated_at?: Date;
}

export type ICheckinCheckoutCreate = Omit<ICheckinCheckout, "id" | "created_at" | "updated_at">
export type ICheckinCheckoutUpdate = Partial<Omit<ICheckinCheckoutCreate, "carrier_id">>

@Table({ timestamps: true, underscored: true, tableName: "CheckinCheckouts", createdAt: "created_at", updatedAt: "updated_at" })
export class CheckinCheckout extends Model<ICheckinCheckout, ICheckinCheckoutCreate> {
  @Column({ allowNull: false }) type: ECheckinCheckoutType;
  @Column({ allowNull: false }) ifta_number: string;
  @Column({ allowNull: false }) ny_number: string;
  @Column({ allowNull: false }) binder: ECheckinCheckoutBinder;

  @Column({ allowNull: false }) ky_permit_current: EBool;
  @Column({ allowNull: false }) nv_permit_current: EBool;
  @Column({ allowNull: false }) nm_permit_current: EBool;
  @Column({ allowNull: false }) or_permit_current: EBool;
  @Column({ allowNull: false }) ct_permit_current: EBool;

  @Column({ allowNull: false }) valid_insurance: EBool;
  @Column({ allowNull: false }) registiration_current: EBool;
  @Column({ allowNull: false }) tablet_charger: EBool;
  @Column({ allowNull: false }) fuel_card: EBool;
  @Column({ allowNull: false }) mileage: string;
  @Column({ allowNull: false }) damage: string;
  @Column({ allowNull: false }) damage_type: string;
  @Column({ allowNull: false }) fleet_rep: string;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;

  @ForeignKey(() => Driver) @Column({ allowNull: true }) primary_driver_id!: number;
  @BelongsTo(() => Driver, { as: "primary_driver" }) primary_driver: IDriver;

  @ForeignKey(() => Driver) @Column({ allowNull: true }) secondary_driver_id!: number;
  @BelongsTo(() => Driver, { as: "secondary_driver" }) secondary_driver: IDriver;

  @ForeignKey(() => Truck) @Column({ allowNull: true }) truck_id!: number;
  @BelongsTo(() => Truck) truck: ITruck;
}
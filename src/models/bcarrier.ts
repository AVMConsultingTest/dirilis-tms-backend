import { Table, ForeignKey, Column, Model, BelongsTo } from "sequelize-typescript";
import { EBool } from "../types";
import { Company, ICompany } from ".";

export interface IBCarrier {
  id: number

  name: string
  dba_name: string
  mc_number: string
  dot_number: string
  active_insurance: EBool
  insurance_expiration: Date
  cargo_coverage: string
  status: string
  home_base_city: string
  home_base_state: string

  broker_id: number

  created_at?: Date;
  updated_at?: Date;
}

export type IBCarrierCreate = Omit<IBCarrier, "id" | "created_at" | "updated_at">
export type IBCarrierUpdate = Partial<Omit<IBCarrierCreate, "broker_id">>

@Table({ timestamps: true, underscored: true, tableName: "BCarriers", createdAt: "created_at", updatedAt: "updated_at" })
export class BCarrier extends Model<IBCarrier, IBCarrierCreate> {
  @Column({ allowNull: false }) name: string;
  @Column({ allowNull: false }) dba_name: string;
  @Column({ allowNull: false }) mc_number: string;
  @Column({ allowNull: false }) dot_number: string;
  @Column({ allowNull: false }) active_insurance: EBool;
  @Column({ allowNull: false }) insurance_expiration: Date;
  @Column({ allowNull: false }) cargo_coverage: string;
  @Column({ allowNull: false }) status: string;
  @Column({ allowNull: false }) home_base_city: string;
  @Column({ allowNull: false }) home_base_state: string;

  @ForeignKey(() => Company) @Column({ allowNull: false }) broker_id: number;
  @BelongsTo(() => Company) broker!: ICompany;
}
import { Table, ForeignKey, Column, Model, BelongsTo } from "sequelize-typescript";
import { EBool } from "../types";
import { Company, ICompany } from ".";

export interface IBContact {
  id: number

  first_name: string
  last_name: string
  email: string
  phone_number: string
  role: string
  verified: EBool

  broker_id: number

  created_at?: Date
  updated_at?: Date
}

export type IBContactCreate = Omit<IBContact, "id" | "created_at" | "updated_at">
export type IBContactUpdate = Partial<Omit<IBContactCreate, "broker_id">>

@Table({ timestamps: true, underscored: true, tableName: "BContacts", createdAt: "created_at", updatedAt: "updated_at" })
export class BContact extends Model<IBContact, IBContactCreate> {
  @Column({ allowNull: false }) first_name: string;
  @Column({ allowNull: false }) last_name: string;
  @Column({ allowNull: false }) email: string;
  @Column({ allowNull: false }) phone_number: string;
  @Column({ allowNull: false }) role: string;
  @Column({ allowNull: false }) verified: EBool;

  @ForeignKey(() => Company) @Column({ allowNull: false }) broker_id: number;
  @BelongsTo(() => Company) broker!: ICompany;
}
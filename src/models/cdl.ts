import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company, ICompany, User, IUser, Driver, IDriver } from ".";
import { ECdlClass, ECdlType } from "../types";

export interface ICdl {
  id: number;

  type: ECdlType
  issued_state: string;
  number: string;
  class: ECdlClass
  expiration_date: Date;
  endorsement: string
  file: string

  carrier_id: number
  driver_id: number
  user_id: number;

  comment?: string

  created_at?: Date;
  updated_at?: Date;
}

export type ICdlCreate = Omit<ICdl, "id" | "created_at" | "updated_at">;
export type ICdlUpdate = Partial<Omit<ICdlCreate, "carrier_id">>

@Table({ timestamps: true, underscored: true, tableName: "Cdls", createdAt: "created_at", updatedAt: "updated_at" })
export class Cdl extends Model<ICdl, ICdlCreate> {
  @Column({ allowNull: false }) issued_state: string;
  @Column({ allowNull: false }) number: string;
  @Column({ allowNull: false }) expiration_date: Date;
  @Column({ allowNull: false }) type: ECdlType;
  @Column({ allowNull: false }) class: ECdlClass;
  @Column({ allowNull: false }) endorsement: string;
  @Column({ allowNull: false }) file: string;
  @Column({ allowNull: true }) comment?: string;

  @ForeignKey(() => User) @Column({ allowNull: false }) user_id: number;
  @BelongsTo(() => User) user: IUser;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;

  @ForeignKey(() => Driver) @Column({ allowNull: false }) driver_id!: number;
  @BelongsTo(() => Driver) driver: IDriver;
}
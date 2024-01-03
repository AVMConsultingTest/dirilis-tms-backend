import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Company, ICompany } from "./company";
import { Truck, ITruck } from "./truck";
import { EBool } from "../types";

export interface IPermit {
  id: number;
  type: string;
  number: string;
  duration: string;
  start_date: Date;
  end_date: Date;
  purchased_date: Date;
  cost: number;
  delivery_status: string;
  vendor_url: string;
  installed: EBool;
  notes: string;

  carrier_id: number;
  truck_id: number;

  created_at?: Date
  updated_at?: Date
}

export interface IPermitCreate extends Omit<IPermit, "id"> { }
export interface IPermitUpdate extends Partial<Omit<IPermit, "carrier_id" | "truck_id">> { }

@Table({ timestamps: true, underscored: true, tableName: "Permits", createdAt: "created_at", updatedAt: "updated_at" })
export class Permit extends Model<IPermit, IPermitCreate> {
  @Column({ allowNull: false }) type!: string;
  @Column({ allowNull: false }) number!: string;
  @Column({ allowNull: false }) duration!: string;
  @Column({ allowNull: false, type: DataType.DATEONLY }) start_date!: Date;
  @Column({ allowNull: false, type: DataType.DATEONLY }) end_date!: Date;
  @Column({ allowNull: false, type: DataType.DATEONLY }) purchased_date!: Date;
  @Column({ allowNull: false, type: DataType.DECIMAL }) cost!: number;
  @Column({ allowNull: false }) delivery_status!: string;
  @Column({ allowNull: false }) vendor_url!: string;
  @Column({ allowNull: false }) installed!: EBool;
  @Column({ allowNull: true }) notes!: string;

  @ForeignKey(() => Truck) @Column({ allowNull: true }) truck_id!: number;
  @BelongsTo(() => Truck) truck: ITruck;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;
}

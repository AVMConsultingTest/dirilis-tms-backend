import { Table, Column, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Driver, Company, ICompany, IDriver, IVendor, Vendor, ITrailer, ITruck, Trailer, Truck } from ".";
import { EServiceVehicleType } from "../types";
export interface IService {
  id: number

  vehicle_id: number
  vehicle_type: EServiceVehicleType
  vehicle_status: string

  type: string;

  dot_inspection_number: string;
  repair_start_date?: Date;
  repair_completion_date?: Date;
  repair_description: string;
  repair_facility?: string;

  notes?: string;

  carrier_id: number;
  driver_id: number;
  vendor_id: number;
  trailer_id: number;
  truck_id: number;

  truck?: ITruck;
  vendor?: IVendor;
  trailer?: ITrailer;
  driver?: IDriver;

  created_at?: Date;
  updated_at?: Date;
}

export type IServiceCreate = Omit<IService, "id" | "vehicle_status">
export type IServiceUpdate = Partial<Omit<IService, "carrier_id" | "id" | "vehicle_status">>

@Table({ timestamps: true, underscored: true, tableName: "Services", createdAt: "created_at", updatedAt: "updated_at" })
export class Service extends Model<IService, IServiceCreate> {
  @Column({ allowNull: false }) type: string;

  @Column({ allowNull: false }) dot_inspection_number: string;
  @Column({ allowNull: true }) repair_start_date?: Date;
  @Column({ allowNull: true }) repair_completion_date?: Date;
  @Column({ allowNull: false }) repair_description: string;
  @Column({ allowNull: true }) repair_facility?: string;

  notes?: string;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;

  @ForeignKey(() => Driver) @Column({ allowNull: true }) driver_id!: number;
  @BelongsTo(() => Driver) driver: IDriver;

  @ForeignKey(() => Vendor) @Column({ allowNull: true }) vendor_id!: number;
  @BelongsTo(() => Vendor) vendor: IVendor;

  @ForeignKey(() => Trailer) @Column({ allowNull: true }) trailer_id!: number;
  @BelongsTo(() => Trailer) trailer: ITrailer;

  @ForeignKey(() => Truck) @Column({ allowNull: true }) truck_id!: number;
  @BelongsTo(() => Truck) truck: ITruck;
}

import { Table, Column, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Company, Driver, ICompany } from ".";
import { ETruckStatus, EVehicleOwnershipType } from "../types";

export interface ITruck {
  id: number;

  unit_number: string;
  status: ETruckStatus;
  brand: string;
  model: string;
  year: string;
  color: string;
  plate: string;
  make: string;
  fuel_type: string;
  gross_weight: string;
  number_of_axles: number;
  vin_number: string;
  ownership_type: EVehicleOwnershipType;
  owner_driver_id?: number;
  notes: string;
  carrier_id: number

  created_at: Date;
  updated_at: Date;
}

export type ITruckCreate = Omit<ITruck, "id">

export type ITruckUpdate = Partial<Omit<ITruck, "carrier_id">>

@Table({ timestamps: true, underscored: true, tableName: "Trucks", createdAt: "created_at", updatedAt: "updated_at" })
export class Truck extends Model<ITruck, ITruckCreate> {
  @Column({ allowNull: true }) status!: ETruckStatus;
  @Column({ allowNull: true }) brand!: string;
  @Column({ allowNull: true }) model!: string;
  @Column({ allowNull: true }) color!: string;
  @Column({ allowNull: true }) year!: string;
  @Column({ allowNull: true }) plate!: string;
  @Column({ allowNull: true }) unit_number!: string;
  @Column({ allowNull: true }) make!: string;
  @Column({ allowNull: true }) fuel_type!: string;
  @Column({ allowNull: true }) gross_weight!: string;
  @Column({ allowNull: true }) number_of_axles!: number;
  @Column({ allowNull: true }) vin_number!: string;
  @Column({ allowNull: true }) ownership_type!: EVehicleOwnershipType;
  @Column({ allowNull: true }) notes!: string;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;

  @ForeignKey(() => Driver) @Column({ allowNull: true }) owner_driver_id!: number;
  @BelongsTo(() => Driver) owner_driver: Driver;
}

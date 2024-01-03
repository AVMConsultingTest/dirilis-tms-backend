
import { Table, Column, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { EBool } from "../types";
import { ITruck, Truck } from "./truck";
import { Company, ICompany } from "./company";
import { Driver, IDriver } from "./driver";

export interface IAccident {
    id: number;
    carrier_id: number;
    driver_id: number;
    truck_id: number;

    report_date: Date;
    report_number: string;
    report_state: string;
    fatal: EBool;
    injury: EBool;
    tow: EBool;
    haz_mat: EBool;
    notes?: string;
    source?: string

    created_at?: Date;
    updated_at?: Date;
}

export type IAccidentCreate = Omit<IAccident, "id">

export type IAccidentUpdate = Partial<Omit<IAccidentCreate, "carrier_id">>

@Table({ timestamps: true, underscored: true, tableName: "Accidents", createdAt: "created_at", updatedAt: "updated_at" })
export class Accident extends Model<IAccident, IAccidentCreate> {
    @Column({ allowNull: false }) report_date!: Date;
    @Column({ allowNull: false }) report_number!: string;
    @Column({ allowNull: false }) report_state!: string;
    @Column({ allowNull: false }) fatal: EBool;
    @Column({ allowNull: false }) injury: EBool;
    @Column({ allowNull: false }) tow: EBool;
    @Column({ allowNull: false }) haz_mat: EBool;
    @Column({ allowNull: true }) notes: string;
    @Column({ allowNull: true }) source: string;

    @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
    @BelongsTo(() => Company) carrier: ICompany;

    @ForeignKey(() => Driver) @Column({ allowNull: false }) driver_id!: number;
    @BelongsTo(() => Driver) driver: IDriver;

    @ForeignKey(() => Truck) @Column({ allowNull: false }) truck_id!: number;
    @BelongsTo(() => Truck) truck: ITruck;
}
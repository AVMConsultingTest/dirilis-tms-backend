import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { EAlertStatus } from "../types";
import { Driver, IDriver } from "./driver";
import { Company, ICompany } from "./company";

export interface IAlert {
    id: number
    status: EAlertStatus
    description: string
    date: Date
    licence_status: string

    carrier_id: number
    driver_id: number
    driver_name?: string
    driver?: IDriver

    created_at?: Date;
    updated_at?: Date;
}

export type IAlertCreate = Omit<IAlert, "id">
export type IAlertUpdate = Partial<Omit<IAlertCreate, "carrier_id">>

@Table({ timestamps: true, underscored: true, tableName: "Alerts", createdAt: "created_at", updatedAt: "updated_at" })
export class Alert extends Model<IAlert, IAlertCreate> {
    @Column({ allowNull: false, defaultValue: EAlertStatus.New }) status: EAlertStatus;
    @Column({ allowNull: false }) description: string;
    @Column({ allowNull: false }) date: Date;
    @Column({ allowNull: false }) licence_status: string;

    @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
    @BelongsTo(() => Company) carrier: ICompany;

    @ForeignKey(() => Driver) @Column({ allowNull: false }) driver_id!: number;
    @BelongsTo(() => Driver) driver: IDriver;
}
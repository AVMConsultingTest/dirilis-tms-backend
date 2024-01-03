import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { EEldAlertEventType, EEldAlertStatus } from "../types";
import { Company, ICompany } from "./company";
import { Driver, IDriver } from "./driver";

export interface IEldAlert {
    id: number

    event_type: EEldAlertEventType
    status: EEldAlertStatus

    video_time: string
    video_url: string

    carrier_id: number
    driver_id: number

    created_at?: number
    updated_at?: number
}

export type IEldAlertCreate = Omit<IEldAlert, "id" | "created_at" | "updated_at">
export type IEldAlertUpdate = Partial<Omit<IEldAlertCreate, "carrier_id">>

@Table({ tableName: "EldAlerts", underscored: true, createdAt: "created_at", updatedAt: "updated_at" })
export class EldAlert extends Model<IEldAlert, IEldAlertCreate> {
    @Column({ allowNull: false }) event_type: EEldAlertEventType;
    @Column({ allowNull: false }) status: EEldAlertStatus;

    @Column({ allowNull: false }) video_time: string;
    @Column({ allowNull: false }) video_url: string;

    @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
    @BelongsTo(() => Company) carrier: ICompany;
  
    @ForeignKey(() => Driver) @Column({ allowNull: true }) driver_id!: number;
    @BelongsTo(() => Driver) driver: IDriver;
}
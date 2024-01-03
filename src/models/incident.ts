import { Table, Column, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Company, ICompany } from "./company";
import { Driver, IDriver } from "./driver";
import { Truck, ITruck } from "./truck";

export interface IIncident {
    id: number;

    unit_number: string;
    event_type: string;
    date: Date;
    training_required: string;
    training_completed: string;

    carrier_id: number;
    driver_id: number;
    truck_id: number;

    created_at?: Date
    updated_at?: Date
}

export type IIncidentCreate = Omit<IIncident, "id">
export type IIncidentUpdate = Partial<Omit<IIncidentCreate, "carrier_id">>

@Table({ timestamps: true, underscored: true, tableName: "Incidents", createdAt: "created_at", updatedAt: "updated_at" })
export class Incident extends Model<Incident, IIncident> {
    @Column({ allowNull: false }) unit_number!: string;
    @Column({ allowNull: false }) event_type!: string;
    @Column({ allowNull: false }) date?: Date;
    @Column({ allowNull: false }) training_required?: string;
    @Column({ allowNull: false }) training_completed?: string;

    @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
    @BelongsTo(() => Company) carrier: ICompany;

    @ForeignKey(() => Driver) @Column({ allowNull: false }) driver_id!: number;
    @BelongsTo(() => Driver) driver: IDriver;

    @ForeignKey(() => Truck) @Column({ allowNull: false }) truck_id!: number;
    @BelongsTo(() => Truck) truck: ITruck;
}
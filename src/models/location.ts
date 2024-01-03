import { Table, Column, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { ELocationStatus } from "../types";
import { Company, ICompany } from "./company";

export interface ILocation {
    id: number;
    carrier_id: number;

    name: string;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    zip_code: string;

    status: ELocationStatus;

    created_at?: Date;
    updated_at?: Date;
}

export type ILocationCreate = Omit<ILocation, "id | created_at | updated_at">;
export type ILocationUpdate = Partial<Omit<ILocationCreate, "carrier_id">>;


@Table({ timestamps: true, underscored: true, tableName: "Locations", createdAt: "created_at", updatedAt: "updated_at" })
export class Location extends Model<ILocation, ILocationCreate> {
    @Column({ allowNull: false }) name!: string;
    @Column({ allowNull: false }) address_line1!: string;
    @Column({ allowNull: true }) address_line2?: string;
    @Column({ allowNull: false }) city!: string;
    @Column({ allowNull: false }) state!: string;
    @Column({ allowNull: false }) zip_code!: string;
    @Column({ allowNull: false }) status!: ELocationStatus;

    @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
    @BelongsTo(() => Company) carrier: ICompany;
}
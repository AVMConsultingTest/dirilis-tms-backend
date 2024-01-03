import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { EDrugTestStatus, EDrugTestType } from "../types";
import { Company, ICompany } from "./company";
import { Driver, IDriver } from "./driver";

export interface IDrugTest {
    id: number

    type: EDrugTestType
    status: EDrugTestStatus
    date: Date
    result?: string

    carrier_id: number
    driver_id: number

    created_at?: number
    updated_at?: number
}

export type IDrugTestCreate = Omit<IDrugTest, "id">
export type IDrugTestUpdate = Partial<Omit<IDrugTestCreate, "carrier_id">>

@Table({ timestamps: true, underscored: true, tableName: "DrugTests", createdAt: "created_at", updatedAt: "updated_at" })
export class DrugTest extends Model<IDrugTest, IDrugTestCreate> {
    @Column({ allowNull: false }) type: EDrugTestType;
    @Column({ allowNull: false, defaultValue: EDrugTestStatus.Pending }) status: EDrugTestStatus;
    @Column({ allowNull: false }) date: Date;
    @Column({ allowNull: true }) result?: string;

    @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
    @BelongsTo(() => Company) carrier: ICompany;

    @ForeignKey(() => Driver) @Column({ allowNull: false }) driver_id!: number;
    @BelongsTo(() => Driver) driver: IDriver;
}
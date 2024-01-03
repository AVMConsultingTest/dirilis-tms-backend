import { Table, Column, Model, BelongsTo, ForeignKey, DataType } from "sequelize-typescript";
import { Company, ICompany } from "./company";
import { EApplicantStatus, EApplicantType } from "../types";

export interface IApplicant {
    id: number;

    first_name: string;
    last_name: string;
    type: EApplicantType;
    hire_date: Date;
    phone_number: string;
    email: string;
    status: EApplicantStatus;

    carrier_id: number;

    created_at?: Date
    updated_at?: Date
}

export type IApplicantCreate = Omit<IApplicant, "id">
export type IApplicantUpdate = Partial<Omit<IApplicantCreate, "carrier_id">>

@Table({ timestamps: true, underscored: true, tableName: "Applicants", createdAt: "created_at", updatedAt: "updated_at" })
export class Applicant extends Model<IApplicant, IApplicantCreate> {
    @Column({ allowNull: false }) first_name: string;
    @Column({ allowNull: false }) last_name: string;
    @Column({ allowNull: false }) type: EApplicantType;
    @Column({ allowNull: false, type: DataType.DATEONLY }) hire_date: Date;
    @Column({ allowNull: false }) phone_number: string;
    @Column({ allowNull: false }) email: string;
    @Column({ allowNull: false }) status: EApplicantStatus;

    @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id: number;
    @BelongsTo(() => Company, "carrier_id") carrier!: ICompany;
}
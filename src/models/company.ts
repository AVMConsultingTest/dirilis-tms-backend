import { Table, Column, Model } from "sequelize-typescript";
import { ECompanyType } from "../types";

export interface ICompany {
    id: number
    name: string
    type: ECompanyType
    email: string
    phone_number?: string

    address_line1?: string
    address_line2?: string
    state?: string
    city?: string
    zip_code?: string
    country?: string

    account_number?: string
    routing_number?: string
    ein_number?: string
    mc_number?: string
    dot_number?: string

    factoring_company?: string
    factoring_account_number?: string
    factoring_username?: string
    factoring_password?: string

    logo?: string

    created_at?: Date
    updated_at?: Date
}

export type ICompanyCreate = Omit<ICompany, "id">
export type ICompanyUpdate = Partial<ICompanyCreate>

@Table({ timestamps: true, underscored: true, tableName: "Companies", createdAt: "created_at", updatedAt: "updated_at" })
export class Company extends Model<ICompany, ICompanyCreate> {
    @Column({ allowNull: false, unique: true }) name: string;
    @Column({ allowNull: false }) type: ECompanyType;
    @Column({ allowNull: false, unique: true }) email: string;
    @Column phone_number: string | null;
    @Column address_line1: string | null;
    @Column address_line2: string | null;
    @Column state: string | null;
    @Column city: string | null;
    @Column zip_code: string | null;
    @Column country: string | null;
    @Column account_number: string | null;
    @Column routing_number: string | null;
    @Column ein_number: string | null;
    @Column mc_number: string | null;
    @Column dot_number: string | null;
    @Column logo: string | null;

    @Column factoring_company: string;
    @Column factoring_account_number: string;
    @Column factoring_username: string;
    @Column factoring_password: string;
}
import { Table, Column, Model } from "sequelize-typescript";
import { ECompanyType } from "../types";

export interface IClient {
    id: number

    first_name: string
    last_name: string
    email: string
    phone_number: string
    company_name: string
    company_type: ECompanyType
    source?: string

    created_at?: Date
    updated_at?: Date
}

export type IClientCreate = Omit<IClient, "id">
export type IClientUpdate = Partial<IClientCreate>

@Table({ timestamps: true, underscored: true, tableName: "Clients", createdAt: "created_at", updatedAt: "updated_at" })
export class Client extends Model<IClient, IClientCreate> {
    @Column({ allowNull:false }) first_name: string;
    @Column({ allowNull:false }) last_name: string;
    @Column({ allowNull:false }) email: string;
    @Column({ allowNull:false }) phone_number: string;
    @Column({ allowNull:false }) company_name: string;
    @Column({ allowNull:false }) company_type: ECompanyType;
    @Column({ allowNull:true }) source?: string;
}
import { Table, Column, Model, BelongsTo, ForeignKey, DataType } from "sequelize-typescript";
import { Company, ICompany } from "./company";
import { EBrokerStatus } from "../types";
export interface IBroker {
    id: number;

    name: string;
    mc: string;
    credit_limit: number;
    credit_available: string;
    score: string;
    credit_limit_incrase: string;
    invoicing_email: string;
    status: EBrokerStatus;
    contract: string;
    notes?: string;

    bill_to_address: string;
    direct_billing: boolean;
    billing_email: string;
    billing_option: string;

    address_line1: string;
    address_line2: string;
    state: string;
    city: string;
    zip_code: string;
    country: string;

    contact1_first_name: string;
    contact1_last_name: string;
    contact1_email: string
    contact1_phone_number: string

    contact2_first_name?: string;
    contact2_last_name?: string;
    contact2_email?: string
    contact2_phone_number?: string

    carrier_id: number
    
    created_at?: Date;
    updated_at?: Date;
}

export type IBrokerCreate = Omit<IBroker, "id">
export type IBrokerUpdate = Partial<Omit<IBrokerCreate, "carrier_id">>

@Table({ timestamps: true, underscored: true, tableName: "Brokers", createdAt: "created_at", updatedAt: "updated_at" })
export class Broker extends Model<IBroker, IBrokerCreate> {
    @Column({ allowNull: false }) name: string;
    @Column({ allowNull: false }) mc: string;
    @Column({ allowNull: false, type: DataType.DECIMAL }) credit_limit: number;
    @Column({ allowNull: false }) credit_available: string;
    @Column({ allowNull: false }) score: string;
    @Column({ allowNull: false }) credit_limit_incrase: string;
    @Column({ allowNull: false }) invoicing_email: string;
    @Column({ allowNull: false }) status: EBrokerStatus;
    @Column({ allowNull: false }) contract: string;
    @Column({ allowNull: true }) notes?: string;

    @Column({ allowNull: false }) bill_to_address: string;
    @Column({ allowNull: false }) direct_billing: boolean;
    @Column({ allowNull: false }) billing_email: string;
    @Column({ allowNull: false }) billing_option: string;

    @Column({ allowNull: false }) address_line1: string;
    @Column({ allowNull: false }) address_line2: string;
    @Column({ allowNull: false }) state: string;
    @Column({ allowNull: false }) city: string;
    @Column({ allowNull: false }) zip_code: string;
    @Column({ allowNull: false }) country: string;

    @Column({ allowNull: false }) contact1_first_name: string;
    @Column({ allowNull: false }) contact1_last_name: string;
    @Column({ allowNull: false }) contact1_email: string;
    @Column({ allowNull: false }) contact1_phone_number: string;

    @Column({ allowNull: true }) contact2_first_name?: string;
    @Column({ allowNull: true }) contact2_last_name?: string;
    @Column({ allowNull: true }) contact2_email?: string;
    @Column({ allowNull: true }) contact2_phone_number?: string;

    @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
    @BelongsTo(() => Company) carrier: ICompany;
}
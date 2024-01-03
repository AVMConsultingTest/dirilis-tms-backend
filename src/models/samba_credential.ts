import { Table, Column, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Company, ICompany } from "./company";

export interface ISambaCredential {
    id: number
    carrier_id: number;
    x_api_key: string;
    client_id: string;
    client_secret: string;
    webhook_url: string;

    created_at?: Date
    updated_at?: Date
}

export type ISambaCredentialCreate = Omit<ISambaCredential,  "webhook_url">
export type ISambaCredentialUpdate = Partial<ISambaCredentialCreate>
@Table({ timestamps: true, underscored: true, tableName: "SambaCredentials", createdAt: "created_at", updatedAt: "updated_at" })
export class SambaCredential extends Model<ISambaCredential, ISambaCredentialCreate> {
    @Column({ allowNull: false }) x_api_key: string;
    @Column({ allowNull: false }) client_id: string;
    @Column({ allowNull: false }) client_secret: string;
    @Column({ allowNull: false }) webhook_url: string;

    @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
    @BelongsTo(() => Company) carrier: ICompany;
}


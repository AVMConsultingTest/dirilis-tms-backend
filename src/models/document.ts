import { Column, ForeignKey, Table, Model, BelongsTo } from "sequelize-typescript";
import { Company, ICompany } from "./company";

export interface IDocument {
    id: number

    category?: string
    type?: string
    status?: string
    description?: string
    file: string
    expire?: Date

    driver_id?: number
    alert_id?: number
    carrier_id: number
    check_list_id?: number
    invoice_id?: number
    load_stop_id?: number
    drug_test_id?: number

    created_at?: Date
    updated_at?: Date 
}

export type IDocumentCreate = Omit<IDocument, "id">
export type IDocumentUpdate = Partial<Omit<IDocumentCreate, "carrier_id">>

@Table({ underscored: true, timestamps: true, tableName: "Documents", createdAt: "created_at", updatedAt: "updated_at" })
export class Document extends Model<IDocument, IDocumentCreate> {
    @Column({ allowNull: true }) category?: string;
    @Column({ allowNull: true }) type?: string;
    @Column({ allowNull: true }) status?: string;
    @Column({ allowNull: true }) description?: string;
    @Column({ allowNull: false }) file: string;
    @Column({ allowNull: true }) expire?: Date;

    @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id: number;
    @BelongsTo(() => Company, "carrier_id") carrier!: ICompany;
}
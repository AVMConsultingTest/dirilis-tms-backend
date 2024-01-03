import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Company, ICompany } from "./company";
import { Load, ILoad } from "./load";
import { ELoadOfferStatus } from "../types";

export interface ILoadOffer {
    id: number

    load_id: number
    carrier_id: number

    rate_per_mile: number
    all_in_rate: number

    notes?: string
    source: string

    joke_offer_rate: number
    kpi: number

    status: ELoadOfferStatus

    created_at?: Date
    updated_at?: Date
}

export type ILoadOfferCreate = Omit<ILoadOffer, "id">
export type ILoadOfferUpdate = Partial<Omit<ILoadOfferCreate, "carrier_id">>

@Table({ tableName: "LoadOffers", underscored: true, timestamps: true, createdAt: "created_at", updatedAt: "updated_at" })
export class LoadOffer extends Model<ILoadOffer, ILoadOfferCreate> {
    @Column({ allowNull: false }) rate_per_mile: number;
    @Column({ allowNull: false }) all_in_rate: number;

    @Column({ allowNull: true }) notes: string;
    @Column({ allowNull: false }) source: string;

    @Column({ allowNull: false }) joke_offer_rate: number;
    @Column({ allowNull: false }) kpi: number;

    @Column({ allowNull: false, defaultValue: ELoadOfferStatus.Pending }) status: ELoadOfferStatus;

    @ForeignKey(() => Load) @Column({ allowNull: false }) load_id!: number;
    @BelongsTo(() => Load) load: ILoad;

    @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
    @BelongsTo(() => Company) carrier: ICompany;
}
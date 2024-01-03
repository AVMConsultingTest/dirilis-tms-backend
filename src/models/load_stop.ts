import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { ILoad, Load } from "./load";

export interface ILoadStop {
    id: number

    load_id: number

    pickup_address_line1: string;
    pickup_address_line2?: string;
    pickup_city: string;
    pickup_state: string;
    pickup_zip_code: string;
    pickup_date: Date

    drop_off_address_line1: string;
    drop_off_address_line2?: string;
    drop_off_city: string;
    drop_off_state: string;
    drop_off_zip_code: string;
    drop_off_date: Date

    payout: number
    distance: number
    weight: number

    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;

    instructions?: string

    created_at?: Date
    updated_at?: Date
}

export type ILoadStopCreate = Omit<ILoadStop, "id" | "created_at" | "updated_at">
export type ILoadStopUpdate = Partial<Omit<ILoadStopCreate, "load_id">>

@Table({ underscored: true, tableName: "LoadStops", timestamps: true, createdAt: "created_at", updatedAt: "updated_at" })
export class LoadStop extends Model<ILoadStop, ILoadStopCreate> {
    @Column({ allowNull: false }) pickup_address_line1: string;
    @Column({ allowNull: true }) pickup_address_line2?: string;
    @Column({ allowNull: false }) pickup_city: string;
    @Column({ allowNull: false }) pickup_state: string;
    @Column({ allowNull: false }) pickup_zip_code: string;
    @Column({ allowNull: false }) pickup_date: Date;

    @Column({ allowNull: false }) drop_off_address_line1: string;
    @Column({ allowNull: true }) drop_off_address_line2?: string;
    @Column({ allowNull: false }) drop_off_city: string;
    @Column({ allowNull: false }) drop_off_state: string;
    @Column({ allowNull: false }) drop_off_zip_code: string;
    @Column({ allowNull: false }) drop_off_date: Date;

    @Column({ allowNull: false }) payout: number;
    @Column({ allowNull: false }) distance: number;
    @Column({ allowNull: false }) weight: number;

    @Column({ allowNull: false }) first_name: string;
    @Column({ allowNull: false }) last_name: string;
    @Column({ allowNull: false }) email: string;
    @Column({ allowNull: false }) phone_number: string;

    @Column({ allowNull: true }) instructions?: string;

    @ForeignKey(() => Load) @Column({ allowNull: false }) load_id!: number;
    @BelongsTo(() => Load) load: ILoad;
}
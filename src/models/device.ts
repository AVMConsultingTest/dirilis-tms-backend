import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Company, ICompany, Truck, ITruck } from ".";

export interface IDevice {
    id: number;

    type: string;
    vendor: string;
    service_start_date: Date;
    service_end_date: Date;
    returned_date: Date;
    notes?: string;
    timeRange?: string;

    carrier_id: number;
    truck_id: number;

    created_at?: number
    updated_at?: number
}

export type IDeviceCreate = Omit<IDevice, "id">

export type IDeviceUpdate = Partial<Omit<IDeviceCreate, "carrier_id">>


@Table({ timestamps: true, underscored: true, tableName: "Devices", createdAt: "created_at", updatedAt: "updated_at" })
export class Device extends Model<IDevice, IDeviceCreate> {
    @Column({ allowNull: false }) type!: string;
    @Column({ allowNull: false }) vendor!: string;
    @Column({ allowNull: false, type: DataType.DATEONLY }) service_start_date!: Date;
    @Column({ allowNull: false, type: DataType.DATEONLY }) service_end_date!: Date;
    @Column({ allowNull: false, type: DataType.DATEONLY }) returned_date!: Date;
    @Column({ allowNull: true }) notes!: string;

    @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id: number;
    @BelongsTo(() => Company, "carrier_id") carrier!: ICompany;

    @ForeignKey(() => Truck) @Column({ allowNull: false }) truck_id: number;
    @BelongsTo(() => Truck, "carrier_id") truck!: ITruck;
}


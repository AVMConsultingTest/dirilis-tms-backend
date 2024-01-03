import { Column, Table, Model, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { Company, ICompany, Driver, IDriver, IUser, User, Trailer, ITrailer, Truck, ITruck, LoadStop, ILoadStop  } from ".";
import { ELoadBrokerStatus, ELoadStatus } from "../types";
import { Op } from "sequelize";

export interface ILoad {
    id: number

    carrier_id?: number
    broker_id?: number
    dispatcher_id?: number
    
    primary_driver_id?: number
    secondary_driver_id?: number

    trailer_id?: number
    truck_id?: number

    current_stop_id?: number

    status?: ELoadStatus

    miles?: number
    rate_per_mile?: number
    source?: string

    estimated_base_rate?: number
    estimated_duration_minutes?: number
    estimated_fuel_surcharge?: number
    total_payout?: number

    // Carrier & Broker
    pickup_address_line1: string;
    pickup_address_line2?: string; 
    pickup_city: string;
    pickup_state: string;
    pickup_zip_code: string;
    pickup_date: Date

    // Carrier & Broker
    drop_off_address_line1: string;
    drop_off_address_line2?: string;
    drop_off_city: string;
    drop_off_state: string;
    drop_off_zip_code: string;
    drop_off_date: Date

    load_complete_date?: Date | { [Op.between]: [Date, Date] }
    carrier_revenue?: number

    reference_number?: string

    // Broker
    customer_id?: number
    commodity_type?: string

    total_distance: number

    broker_revenue?: number
    broker_status?: ELoadBrokerStatus
    max_buy?: number
    buy_now?: number
    loading_type: string
    unloading_type: string
    is_trailer_required: boolean

    load_stops?: ILoadStop[]
    

    created_at?: Date
    updated_at?: Date
}

export type ILoadCreate = Omit<ILoad, "id">
export type ILoadUpdate = Partial<ILoadCreate>

@Table({ timestamps: true, underscored: true, tableName: "Loads", createdAt: "created_at", updatedAt: "updated_at" })
export class Load extends Model<ILoad, ILoadCreate> {
    @Column({ allowNull: true }) status?: ELoadStatus;
    @Column({ allowNull: true }) miles?: number;
    @Column({ allowNull: true }) rate_per_mile?: number;
    @Column({ allowNull: true }) source?: string;
    @Column({ allowNull: true }) estimated_base_rate?: number;
    @Column({ allowNull: true }) estimated_duration_minutes?: number;
    @Column({ allowNull: true }) estimated_fuel_surcharge?: number;
    @Column({ allowNull: true }) total_payout?: number;
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
    @Column({ allowNull: false, }) drop_off_date: Date;
    @Column({ allowNull: true }) load_complete_date?: Date;
    @Column({ allowNull: true }) carrier_revenue?: number;
    @Column({ allowNull: true }) reference_number?: string;
    @Column({ allowNull: true }) commodity_type?: string;
    @Column({ allowNull: true }) broker_revenue?: number;
    @Column({ allowNull: true }) broker_status?: ELoadBrokerStatus;
    @Column({ allowNull: true }) max_buy?: number;
    @Column({ allowNull: true }) buy_now?: number;
    @Column({ allowNull: true }) loading_type: string;
    @Column({ allowNull: true }) unloading_type: string;
    @Column({ allowNull: true }) is_trailer_required: boolean;
    @Column({ allowNull: true }) total_distance: number;

    @Column({ allowNull: true }) customer_id?: number;

    @ForeignKey(() => Company) @Column({ allowNull: true }) carrier_id!: number;
    @BelongsTo(() => Company) carrier: ICompany;

    @ForeignKey(() => User) @Column({ allowNull: true }) broker_id!: number;
    @BelongsTo(() => User) broker: IUser;

    @ForeignKey(() => User) @Column({ allowNull: true }) dispatcher_id!: number;
    @BelongsTo(() => User) dispatcher: IUser;

    @ForeignKey(() => Driver) @Column({ allowNull: true }) primary_driver_id!: number;
    @BelongsTo(() => Driver) primary_driver: IDriver;

    @ForeignKey(() => Driver) @Column({ allowNull: true }) secondary_driver_id!: number;
    @BelongsTo(() => Driver) secondary_driver: IDriver;

    @ForeignKey(() => Truck) @Column({ allowNull: true }) truck_id!: number;
    @BelongsTo(() => Truck) truck: ITruck;
  
    @ForeignKey(() => Trailer) @Column({ allowNull: true }) trailer_id!: number;
    @BelongsTo(() => Trailer) trailer: ITrailer;

    @HasMany(() => LoadStop) load_stops: ILoadStop[];

    @ForeignKey(() => LoadStop) @Column({ allowNull: true }) current_stop_id!: number;
    @BelongsTo(() => LoadStop) current_stop: ILoadStop;
}
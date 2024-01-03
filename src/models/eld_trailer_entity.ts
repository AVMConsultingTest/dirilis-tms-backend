import { Table, Column, BelongsTo, ForeignKey, Model } from "sequelize-typescript";
import { EEldTrailerEntityStatus } from "../types";
import { Company, ICompany } from "./company";
import { Trailer, ITrailer } from "./trailer";

export interface IEldTrailerEntity {
  id: number

  status: EEldTrailerEntityStatus

  last_trip: string
  battary: string
  tags: string

  current_location_lat: string
  current_location_long: string,
  current_location: string

  trailer_id: number
  carrier_id: number

  created_at?: Date
  updated_at?: Date
}

export type IEldTrailerEntityCreate = Omit<IEldTrailerEntity, "id" | "created_at" | "updated_at">
export type IEldTrailerEntityUpdate = Partial<Omit<IEldTrailerEntityCreate, "carrier_id">>

@Table({ tableName: "EldTrailerEntities", underscored: true, createdAt: "created_at", updatedAt: "updated_at" })
export class EldTrailerEntity extends Model<IEldTrailerEntity, IEldTrailerEntityCreate> {
  @Column({ allowNull: false }) status: EEldTrailerEntityStatus;

  @Column({ allowNull: false }) last_trip: string;
  @Column({ allowNull: false }) battary: string;
  @Column({ allowNull: false }) tags: string;

  @Column({ allowNull: true }) current_location_lat: string;
  @Column({ allowNull: true }) current_location_long: string;
  @Column({ allowNull: true }) current_location: string;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;

  @ForeignKey(() => Trailer) @Column({ allowNull: true }) trailer_id!: number;
  @BelongsTo(() => Trailer) trailer: ITrailer;
}
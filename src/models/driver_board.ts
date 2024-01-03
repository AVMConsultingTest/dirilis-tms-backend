import { Table, Column, DataType, Model, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Company, ICompany } from "./company";
import { Driver, IDriver } from "./driver";

export interface IDriverBoard {
  id?: number;
  notes: string;
  on_time?: number;
  acceptance?: number;
  created_at?: Date;
  updated_at?: Date;
  carrier_id?: number;
  driver_id?: number;
}

export type IDriverBoardCreate = Omit<IDriverBoard, "id | carrier_id | created_at | updated_at">;

export type IDriverBoardUpdate = Partial<Omit<IDriverBoardCreate, "">>;
export type IDriverBoardGet = Partial<Omit<IDriverBoardCreate, "driver">>

@Table({ timestamps: true, underscored: true, tableName: "DriverBoards", createdAt: "created_at", updatedAt: "updated_at" })
export class DriverBoard extends Model<IDriverBoard> {
  @Column({ allowNull: false, type: DataType.TEXT }) notes!: string;
  @Column({ allowNull: false, defaultValue: 0 }) on_time: number;
  @Column({ allowNull: false, defaultValue: 0 }) acceptance: number;
  @Column({ allowNull: true, type: DataType.DATE }) created_at?: Date;
  @Column({ allowNull: true, type: DataType.DATE }) updated_at?: Date;

  @ForeignKey(() => Driver) @Column({ allowNull: false }) driver_id!: number;
  @BelongsTo(() => Driver) driver: IDriver;

  @ForeignKey(() => Company) @Column({ allowNull: false }) carrier_id!: number;
  @BelongsTo(() => Company) carrier: ICompany;
}

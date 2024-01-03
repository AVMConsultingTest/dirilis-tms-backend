import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { EPermissionRoute } from "../types";
import { Company, ICompany, IRole, Role } from ".";

export interface IPermission {
  id: number

  route: EPermissionRoute
  can_write: boolean
  can_read: boolean

  role_id: number
  company_id: number

  created_at?: Date
  updated_at?: Date
}

export type IPermissionCreate = Omit<IPermission, "id" | "created_at" | "updated_at">
export type IPermissionUpdate = Partial<Omit<IPermissionCreate, "company_id">>

@Table({ timestamps: true, underscored: true, tableName: "Permissions", createdAt: "created_at", updatedAt: "updated_at" })
export class Permission extends Model<IPermission, IPermissionCreate> {
  @Column({ allowNull: false }) route: EPermissionRoute;
  @Column({ allowNull: false }) can_write: boolean;
  @Column({ allowNull: false }) can_read: boolean;

  @ForeignKey(() => Role) @Column({ allowNull: false }) role_id!: number;
  @BelongsTo(() => Role) role: IRole;

  @ForeignKey(() => Company) @Column({ allowNull: false }) company_id!: number;
  @BelongsTo(() => Company) company: ICompany;
}
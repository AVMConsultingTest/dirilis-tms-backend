import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Company, ICompany, IPermission, Permission } from ".";

export interface IRole {
  id: number;

  name: string

  company_id: number

  permissions: IPermission[]

  created_at?: Date
  updated_at?: Date
}

export type IRoleCreate = Omit<IRole, "id" | "created_at" | "updated_at" | "permissions">
export type IRoleUpdate = Partial<Omit<IRoleCreate, "company_id">>

@Table({ timestamps: true, underscored: true, tableName: "Roles", createdAt: "created_at", updatedAt: "updated_at" })
export class Role extends Model<IRole, IRoleCreate> {
  @Column({ allowNull: false }) name: string;

  @ForeignKey(() => Company) @Column({ allowNull: false }) company_id!: number;
  @BelongsTo(() => Company) company: ICompany;

  @HasMany(() => Permission) permissions?: IPermission[];
}
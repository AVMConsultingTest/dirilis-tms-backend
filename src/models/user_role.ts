import { Table, ForeignKey, Column, Model, BelongsTo } from "sequelize-typescript";
import { Company, ICompany, IRole, IUser, Role, User } from ".";

export interface IUserRole {
  id: number

  user_id: number
  role_id: number
  company_id: number

  role: IRole
  user: IUser

  created_at?: Date
  updated_at?: Date
}

export type IUserRoleCreate = Omit<IUserRole, "id" | "created_at" | "updated_at">
export type IUserRoleUpdate = Partial<Omit<IUserRoleCreate, "company_id">>

@Table({ timestamps: true, underscored: true, tableName: "UserRoles", createdAt: "created_at", updatedAt: "updated_at" })
export class UserRole extends Model<IUserRole, IUserRoleCreate> {

  @ForeignKey(() => User) @Column({ allowNull: false }) user_id!: number;
  @BelongsTo(() => User) user: IUser;

  @ForeignKey(() => Role) @Column({ allowNull: false }) role_id!: number;
  @BelongsTo(() => Role) role: IRole;

  @ForeignKey(() => Company) @Column({ allowNull: false }) company_id!: number;
  @BelongsTo(() => Company) company: ICompany;
}
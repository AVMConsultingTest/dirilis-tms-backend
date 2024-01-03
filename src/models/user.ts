import { Table, Column, Model, BelongsTo, ForeignKey, HasMany } from "sequelize-typescript";
import { EUserRole, EBool } from "../types";
import { IUserRole, UserRole, Company, ICompany, IPermission } from ".";

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    role: EUserRole;
    company_id: number;
    
    // Fields user might set during first login or onboarding:
    job_title?: string; // making it optional
    address_line1?: string;
    address_line2?: string;
    state?: string;
    city?: string;
    zip_code?: string;
    country?: string;
    phone_number?: string;
    fax_number?: string;
    thirt_party_access?: EBool;
    image?: string | null;
    is_owner: boolean;

    // Fields for authentication:
    password?: string;
    is_password_changed?: boolean;
    refresh_token?: string;

    user_roles: IUserRole[]
    permissions: IPermission[]

    created_at?: Date;
    updated_at?: Date;
}

export type IUserCreate = Pick<IUser, "email" |  "password" | "is_password_changed"> & Partial<Pick<IUser, "role" | "company_id" | "is_owner">>
export type IUserUpdate = Partial<Omit<IUser, "id">>

@Table({ timestamps: true, underscored: true, tableName: "Users", createdAt: "created_at", updatedAt: "updated_at" })
export class User extends Model<IUser, IUserCreate> {    
    // Fields required during admin creation:
    @Column first_name!: string | null;
    @Column last_name!: string | null;
    @Column({ allowNull: false, unique: true }) email!: string;     // Ensure uniqueness.
    @Column username!: string | null;
    @Column({ allowNull: false, defaultValue: EUserRole.Carrier }) role!: EUserRole;

    // Fields user might set during first login or onboarding:
    @Column job_title: string | null;
    @Column address_line1: string | null;
    @Column address_line2: string | null;
    @Column state: string | null;
    @Column city: string | null;
    @Column zip_code: string | null;
    @Column country: string | null;
    @Column phone_number: string | null;
    @Column fax_number: string | null;
    @Column thirt_party_access: EBool | null;
    @Column image: string | null;
    @Column is_owner: boolean;

    // Fields for authentication:
    @Column password: string | null;
    @Column({ defaultValue: false }) is_password_changed!: boolean;
    @Column refresh_token: string | null;

    @ForeignKey(() => Company) @Column({ allowNull: true }) company_id!: number;
    @BelongsTo(() => Company) company: ICompany;

    @HasMany(() => UserRole) user_roles: IUserRole[];
}
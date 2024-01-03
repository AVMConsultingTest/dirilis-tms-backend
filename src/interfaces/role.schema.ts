type EPermissionRoute =
  "accidents" | "alerts" | "applicants" | "brokers" | "clients" |
  "companies" | "devices" | "drivers" | "drug-tests" | "incidents" |
  "inspections" | "loads" | "payables" | "payroll" | "permits" |
  "samba" | "services" | "summaries" | "trailers" | "trainings" |
  "trucks" | "users" | "vendors" | "permissions" | "user-roles" | "roles" | "eld" | "factorings" | "teams"

export interface Permission {
  id: number
  route: EPermissionRoute
  can_write: boolean
  can_read: boolean
  role_id: number
}

type PermissionCreateForRole = Pick<Permission, "route" | "can_read" | "can_write">
export type PermissionCreate = Omit<Permission, "id">
export type PermissionUpdate = Partial<Pick<Permission, "can_read" | "can_write">>

export interface Role {
  id: number;
  name: string
  company_id: number
  permissions: Permission[]
}

export type RoleCreate = Pick<
  Role,
  "name"
> &
{
  permissions: PermissionCreateForRole[]
}

export type RoleUpdate = Pick<Role, "name">

export interface UserRole {
  id: number
  user_id: number
  role_id: number
}

export type UserRoleCreate = Omit<UserRole, "id">
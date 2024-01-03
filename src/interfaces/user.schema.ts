type EBool = "Yes" | "No"
type EUserRole = "carrer" | "admin" | "broker";
type EPermissionRoute =
  "accidents" | "alerts" | "applicants" | "brokers" |
  "clients" | "companies" | "devices" | "drivers" |
  "drug-tests" | "incidents" | "inspections" | "loads" |
  "payables" | "payroll" | "permits" | "samba" | "services" |
  "summaries" | "trailers" | "trainings" | "trucks" | "users" | "vendors"
type Email = "example@gmail.com"

export interface Permission {
  id: number

  route: EPermissionRoute
  can_write: boolean
  can_read: boolean

  role_id: number
  company_id: number

  created_at?: Date
  updated_at?: Date
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: Email;
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

  // Fields for authentication:
  password?: string;
  is_password_changed?: boolean;
  refresh_token?: string;
  permissions: Permission[]
}

export type UserCreate = Pick<User, "email" | "role">
export type UserUpdate = Partial<Omit<User, "id">>
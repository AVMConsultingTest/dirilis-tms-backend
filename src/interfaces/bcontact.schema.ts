type EBool = "Yes" | "No"
type Email = "example@gmail.com"

export interface BContact {
  id: number

  first_name: string
  last_name: string
  email: Email
  phone_number: string
  role: string
  verified: EBool
}

export type BContactCreate = Omit<BContact, "id">;
export type BContactUpdate = Partial<Omit<BContact, "id">>
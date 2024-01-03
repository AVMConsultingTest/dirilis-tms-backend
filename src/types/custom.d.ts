import { Transaction } from "sequelize";
import { IUser } from "../models";

export { };

declare global {
  export namespace Express {
    export interface Request {
      user: IUser;
    }
  }

  interface Error {
    detail?: string
  }

  export type Flat<T extends object, K extends keyof T> = Omit<T, K> & T[K]

  export type Query<Where, Select = unknown> = Where extends undefined ? Partial<Q<undefined, Select>> : Q<Where, Select>

}

type Q<Where, Select = unknown> = {
  where: Where,
  select?: Select,
  page_size?: number,
  page_number?: number,
  transaction?: Transaction
  all?: boolean
}
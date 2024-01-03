import { IBCustomerContact, IBCustomerContactCreate, IBCustomerContactUpdate, BCustomerContact } from "../models";

export type WhereMany = Pick<IBCustomerContact, "broker_id"> & Partial<Pick<IBCustomerContact, "bcustomer_id">>
export type WhereOne = Pick<IBCustomerContact, "id" | "broker_id"> & Partial<Pick<IBCustomerContact, "bcustomer_id">>


export async function create(payload: IBCustomerContactCreate, query: Query<undefined>) {
  const result = await BCustomerContact.create(payload, { transaction: query.transaction });
  return result.toJSON();
}

export async function update(payload: IBCustomerContactUpdate, query: Query<WhereOne>) {
  const [result] = await BCustomerContact.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await BCustomerContact.destroy({
    where: query.where
  });
  return result;
}
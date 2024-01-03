import { IBCustomer, IBCustomerCreate, IBCustomerUpdate, BCustomer, IBCustomerContact, BCustomerContact } from "../models";

export type WhereMany = Pick<IBCustomer, "broker_id"> & Partial<Pick<IBCustomer, "email" | "name">>
export type WhereOne = Pick<IBCustomer, "id" | "broker_id">

const bcustomerAttributesExclude: Array<keyof IBCustomer> = ["created_at", "updated_at", "broker_id"];
const bcustomerContactAttributesExclude: Array<keyof IBCustomerContact> = ["created_at", "updated_at", "broker_id", "bcustomer_id"];

export async function count(query: Query<WhereMany>) {
  const result = await BCustomer.count({
    where: query.where
  });
  return result;
}

export async function many(query: Query<WhereMany>) {
  let options = {};

  if (query.page_number && query.page_size) {
    const offset = (query.page_number - 1) * query.page_size;
    options = {
      offset,
      limit: query.page_size,
    };
  }

  const result = await BCustomer.findAll({
    where: query.where,
    attributes: { exclude: bcustomerAttributesExclude },
    include: [
      {
        model: BCustomerContact,
        attributes: { include: bcustomerContactAttributesExclude }
      }
    ],
    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await BCustomer.findOne({
    where: query.where,
    attributes: { exclude: bcustomerAttributesExclude },
    include: [
      {
        model: BCustomerContact,
        attributes: { include: bcustomerContactAttributesExclude }
      }
    ],
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IBCustomerCreate, query: Query<undefined>) {
  const result = await BCustomer.create(payload, { transaction: query.transaction });
  return result.toJSON();
}

export async function update(payload: IBCustomerUpdate, query: Query<WhereOne>) {
  const [result] = await BCustomer.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await BCustomer.destroy({
    where: query.where
  });
  return result;
}
import { IClient, IClientCreate, IClientUpdate, Client } from "../models";

export type WhereMany = Partial<Pick<IClient, "first_name" | "email" | "company_type" | "phone_number" | "company_name">>
export type WhereOne = Pick<IClient, "id">

const clientAttributesExclude: Array<keyof IClient> = ["created_at", "updated_at"];

export async function count(query: Query<WhereMany>) {
  const result = await Client.count({
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

  const result = await Client.findAll({
    where: query.where,
    attributes: { exclude: clientAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await Client.findOne({
    where: query.where,
    attributes: { exclude: clientAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IClientCreate) {
  const result = await Client.create(payload);
  return result.toJSON();
}

export async function update(payload: IClientUpdate, query: Query<WhereOne>) {
  const [result] = await Client.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Client.destroy({
    where: query.where
  });
  return result;
}
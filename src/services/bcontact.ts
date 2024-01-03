import { IBContact, IBContactCreate, IBContactUpdate, BContact } from "../models";

export type WhereMany = Pick<IBContact, "broker_id"> & Partial<Pick<IBContact, "role">>
export type WhereOne = Pick<IBContact, "id" | "broker_id">

const bContactAttributesExclude: Array<keyof IBContact> = ["created_at", "updated_at", "broker_id"];

export async function count(query: Query<WhereMany>) {
  const result = await BContact.count({
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

  const result = await BContact.findAll({
    where: query.where,
    attributes: { exclude: bContactAttributesExclude },
    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await BContact.findOne({
    where: query.where,
    attributes: { exclude: bContactAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IBContactCreate) {
  const result = await BContact.create(payload);
  return result.toJSON();
}

export async function update(payload: IBContactUpdate, query: Query<WhereOne>) {
  const [result] = await BContact.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await BContact.destroy({
    where: query.where
  });
  return result;
}
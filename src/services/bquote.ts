import { IBQuote, IBQuoteCreate, IBQuoteUpdate, BQuote } from "../models";

export type WhereMany = Pick<IBQuote, "broker_id"> & Partial<Pick<IBQuote, "status" | "equipment_type" | "pickup_time" | "delivery_time" | "name" | "origin" | "destination">>
export type WhereOne = Pick<IBQuote, "id" | "broker_id">

const bQuoteAttributesExclude: Array<keyof IBQuote> = ["created_at", "updated_at", "broker_id"];

export async function count(query: Query<WhereMany>) {
  const result = await BQuote.count({
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

  const result = await BQuote.findAll({
    where: query.where,
    attributes: { exclude: bQuoteAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await BQuote.findOne({
    where: query.where,
    attributes: { exclude: bQuoteAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IBQuoteCreate) {
  const result = await BQuote.create(payload);
  return result.toJSON();
}

export async function update(payload: IBQuoteUpdate, query: Query<WhereOne>) {
  const [result] = await BQuote.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await BQuote.destroy({
    where: query.where
  });
  return result;
}
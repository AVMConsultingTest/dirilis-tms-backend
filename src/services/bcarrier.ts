import { IBCarrier, IBCarrierCreate, IBCarrierUpdate, BCarrier } from "../models";

export type WhereMany = Pick<IBCarrier, "broker_id"> & Partial<Pick<IBCarrier, "status">>
export type WhereOne = Pick<IBCarrier, "id" | "broker_id">

const bCarrierAttributesExclude: Array<keyof IBCarrier> = ["created_at", "updated_at", "broker_id"];

export async function count(query: Query<WhereMany>) {
  const result = await BCarrier.count({
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

  const result = await BCarrier.findAll({
    where: query.where,
    attributes: { exclude: bCarrierAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await BCarrier.findOne({
    where: query.where,
    attributes: { exclude: bCarrierAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IBCarrierCreate) {
  const result = await BCarrier.create(payload);
  return result.toJSON();
}

export async function update(payload: IBCarrierUpdate, query: Query<WhereOne>) {
  const [result] = await BCarrier.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await BCarrier.destroy({
    where: query.where
  });
  return result;
}
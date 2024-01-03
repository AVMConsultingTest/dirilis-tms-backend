import { QueryTypes } from "sequelize";
import { IBroker, IBrokerCreate, IBrokerUpdate, Broker } from "../models";

export type WhereMany = Pick<IBroker, "carrier_id"> & Partial<Pick<IBroker, "name" | "mc" | "score">>
export type WhereOne = Pick<IBroker, "id" | "carrier_id">

const brokerAttributesExclude: Array<keyof IBroker> = ["created_at", "updated_at", "carrier_id"];

export async function count(query: Query<WhereMany>) {
  const result = await Broker.count({
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

  const result = await Broker.findAll({
    where: query.where,
    attributes: { exclude: brokerAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function status(query: Query<WhereMany>) {
  const sql = "select distinct status from Broker where carrier_id = :carrier_id";
  const result = await Broker.sequelize.query(sql, { type: QueryTypes.SELECT, replacements: query.where });
  return result;
}

export async function one(query: Query<WhereOne>) {
  const result = await Broker.findOne({
    where: query.where,
    attributes: { exclude: brokerAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IBrokerCreate) {
  const result = await Broker.create(payload);
  return result.toJSON();
}

export async function update(payload: IBrokerUpdate, query: Query<WhereOne>) {
  const [result] = await Broker.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Broker.destroy({
    where: query.where
  });
  return result;
}
import { FindAttributeOptions } from "sequelize";
import { sequelize } from "../configs";
import { Driver, IDriver, IEldIftaDriver, IEldIftaDriverCreate, IEldIftaDriverUpdate, EldIftaDriver } from "../models";

export type WhereMany = Pick<IEldIftaDriver, "carrier_id"> & Partial<Pick<IEldIftaDriver, "driver_id" | "total_distance">>
export type WhereOne = Pick<IEldIftaDriver, "id" | "carrier_id">

const eldIftaDriverAttributesExclude: Array<keyof IEldIftaDriver> = ["created_at", "updated_at", "carrier_id"];
const driverAttributesInclude: FindAttributeOptions | Array<keyof IDriver> = [
  [sequelize.fn("concat", sequelize.col("first_name"), " ", sequelize.col("last_name")), "name"]
];

export async function count(query: Query<WhereMany>) {
  const result = await EldIftaDriver.count({
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

  const result = await EldIftaDriver.findAll({
    where: query.where,
    attributes: { exclude: eldIftaDriverAttributesExclude },
    include: [{
      model: Driver,
      attributes: driverAttributesInclude
    }],

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await EldIftaDriver.findOne({
    where: query.where,
    attributes: { exclude: eldIftaDriverAttributesExclude },
    include: [{
      model: Driver,
      attributes: driverAttributesInclude
    }],
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IEldIftaDriverCreate) {
  const result = await EldIftaDriver.create(payload);
  return result.toJSON();
}

export async function update(payload: IEldIftaDriverUpdate, query: Query<WhereOne>) {
  const [result] = await EldIftaDriver.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await EldIftaDriver.destroy({
    where: query.where
  });
  return result;
}
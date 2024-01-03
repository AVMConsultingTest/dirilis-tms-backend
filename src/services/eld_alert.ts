import { FindAttributeOptions } from "sequelize";
import { sequelize } from "../configs";
import { IEldAlert, IEldAlertCreate, IEldAlertUpdate, EldAlert, IDriver, Driver } from "../models";

export type WhereMany = Pick<IEldAlert, "carrier_id"> & Partial<Pick<IEldAlert, "status" | "driver_id" | "event_type">>
export type WhereOne = Pick<IEldAlert, "id" | "carrier_id">

const eldAlertAttributesExclude: Array<keyof IEldAlert> = ["created_at", "updated_at", "carrier_id"];
const driverAttributesInclude: FindAttributeOptions | Array<keyof IDriver> = [
  [sequelize.fn("concat", sequelize.col("first_name"), " ", sequelize.col("last_name")), "name"]
];

export async function count(query: Query<WhereMany>) {
  const result = await EldAlert.count({
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

  const result = await EldAlert.findAll({
    where: query.where,
    attributes: { exclude: eldAlertAttributesExclude },
    include: [
      {
        model: Driver,
        attributes: driverAttributesInclude
      }
    ],

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await EldAlert.findOne({
    where: query.where,
    attributes: { exclude: eldAlertAttributesExclude },
    include: [
      {
        model: Driver,
        attributes: driverAttributesInclude
      }
    ],
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IEldAlertCreate) {
  const result = await EldAlert.create(payload);
  return result.toJSON();
}

export async function update(payload: IEldAlertUpdate, query: Query<WhereOne>) {
  const [result] = await EldAlert.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await EldAlert.destroy({
    where: query.where
  });
  return result;
}
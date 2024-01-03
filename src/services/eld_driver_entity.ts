import { FindAttributeOptions } from "sequelize";
import { sequelize } from "../configs";
import { IEldDriverEntity, IEldDriverEntityCreate, IEldDriverEntityUpdate, EldDriverEntity, IDriver, Driver, ITruck, Truck } from "../models";

export type WhereMany = Pick<IEldDriverEntity, "carrier_id"> & Partial<Pick<IEldDriverEntity, "driving_status" | "vehicle_id" | "driver_id">>
export type WhereOne = Pick<IEldDriverEntity, "id" | "carrier_id">

const eldDriverEntityAttributesExclude: Array<keyof IEldDriverEntity> = ["created_at", "updated_at", "carrier_id"];
const driverAttributesInclude: FindAttributeOptions | Array<keyof IDriver> = [
  [sequelize.fn("concat", sequelize.col("first_name"), " ", sequelize.col("last_name")), "name"]
];
const truckAttributesInclude: Array<keyof ITruck> = ["model", "unit_number"];

export async function count(query: Query<WhereMany>) {
  const result = await EldDriverEntity.count({
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

  const result = await EldDriverEntity.findAll({
    where: query.where,
    attributes: { exclude: eldDriverEntityAttributesExclude },
    include: [
      {
        model: Driver,
        attributes: driverAttributesInclude
      },
      {
        model: Truck,
        attributes: truckAttributesInclude
      }
    ],

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await EldDriverEntity.findOne({
    where: query.where,
    attributes: { exclude: eldDriverEntityAttributesExclude },
    include: [
      {
        model: Driver,
        attributes: driverAttributesInclude
      },
      {
        model: Truck,
        attributes: truckAttributesInclude
      }
    ],
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IEldDriverEntityCreate) {
  const result = await EldDriverEntity.create(payload);
  return result.toJSON();
}

export async function update(payload: IEldDriverEntityUpdate, query: Query<WhereOne>) {
  const [result] = await EldDriverEntity.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await EldDriverEntity.destroy({
    where: query.where
  });
  return result;
}
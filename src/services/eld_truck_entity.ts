import { FindAttributeOptions } from "sequelize";
import { sequelize } from "../configs";
import { IEldTruckEntity, IEldTruckEntityCreate, IEldTruckEntityUpdate, EldTruckEntity, ITruck, Truck, Driver, IDriver } from "../models";

export type WhereMany = Pick<IEldTruckEntity, "carrier_id"> & Partial<Pick<IEldTruckEntity, "truck_id" | "driver_id" | "status">>
export type WhereOne = Pick<IEldTruckEntity, "id" | "carrier_id">

const eldTruckEntityAttributesExclude: Array<keyof IEldTruckEntity> = ["created_at", "updated_at", "carrier_id"];
const truckAttributesInclude: Array<keyof ITruck> = ["unit_number"];
const driverAttributesInclude: FindAttributeOptions | Array<keyof IDriver> = [
  [sequelize.fn("concat", sequelize.col("first_name"), " ", sequelize.col("last_name")), "name"]
];

export async function count(query: Query<WhereMany>) {
  const result = await EldTruckEntity.count({
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

  const result = await EldTruckEntity.findAll({
    where: query.where,
    attributes: { exclude: eldTruckEntityAttributesExclude },
    include: [
      {
        model: Truck,
        attributes: truckAttributesInclude
      },
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
  const result = await EldTruckEntity.findOne({
    where: query.where,
    attributes: { exclude: eldTruckEntityAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IEldTruckEntityCreate) {
  const result = await EldTruckEntity.create(payload);
  return result.toJSON();
}

export async function update(payload: IEldTruckEntityUpdate, query: Query<WhereOne>) {
  const [result] = await EldTruckEntity.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await EldTruckEntity.destroy({
    where: query.where
  });
  return result;
}
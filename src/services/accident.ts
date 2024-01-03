import { sequelize } from "../configs";
import { IAccident, IAccidentCreate, IAccidentUpdate, Accident, Driver, ITruck, Truck, IDriver } from "../models";
import { FindAttributeOptions } from "sequelize";

export type WhereMany = Pick<IAccident, "carrier_id"> & Partial<Pick<IAccident, "driver_id" | "truck_id">>
export type WhereOne = Pick<IAccident, "id" | "carrier_id">

const accidentAttributesExclude: Array<keyof IAccident> = ["created_at", "updated_at", "carrier_id"];
const driverAttributesInclude: FindAttributeOptions | Array<keyof IDriver> = [
  [sequelize.fn("concat", sequelize.col("first_name"), " ", sequelize.col("last_name")), "name"]
];
const truckAttributesInclude: Array<keyof ITruck> = ["plate"];

export async function count(query: Query<WhereMany>) {
  const result = await Accident.count({
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

  const result = await Accident.findAll({
    where: query.where,
    attributes: { exclude: accidentAttributesExclude },
    include: [
      {
        model: Driver,
        attributes: driverAttributesInclude,
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
  const result = await Accident.findOne({
    where: query.where,
    attributes: { exclude: accidentAttributesExclude },
    include: [
      {
        model: Driver,
        attributes: driverAttributesInclude,
      },
      {
        model: Truck,
        attributes: truckAttributesInclude
      }
    ]
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IAccidentCreate) {
  const result = await Accident.create(payload);
  return result.toJSON();
}

export async function update(payload: IAccidentUpdate, query: Query<WhereOne>) {
  const [result] = await Accident.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Accident.destroy({
    where: query.where
  });
  return result;
}
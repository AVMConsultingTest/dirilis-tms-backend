import { Driver, ILoad, ILoadCreate, ILoadStop, ILoadUpdate, Load, LoadStop, Trailer, Truck } from "../models";
import { EUserRole } from "../types";

export type WhereMany = Partial<Pick<ILoad, "broker_id" | "carrier_id" | "primary_driver_id" | "broker_status" | "status" | "customer_id" | "load_complete_date">>
export type WhereOne = Pick<ILoad, "id"> & Partial<Pick<ILoad, "broker_id" | "carrier_id">>

const loadAttributesExclude: Array<keyof ILoad> = ["created_at", "updated_at"];
const loadAttributesExcludeForCarrier: Array<keyof ILoad> = [...loadAttributesExclude, "buy_now", "broker_revenue", "max_buy"];
const loadAttributesExcludeForBroker: Array<keyof ILoad> = [...loadAttributesExclude, "carrier_revenue"];
const loadStopAttributesExclude: Array<keyof ILoadStop> = ["created_at", "updated_at", "load_id"];

export async function count(query: Query<WhereMany>) {
  const result = await Load.count({
    where: query.where,
    transaction: query.transaction
  });
  return result;
}

export async function many(query: Query<WhereMany, EUserRole>) {
  let options = {};

  if (query.page_number && query.page_size) {
    const offset = (query.page_number - 1) * query.page_size;
    options = {
      offset,
      limit: query.page_size,
    };
  }

  let exclude = loadAttributesExclude;

  if (query.select === EUserRole.Broker) {
    exclude = loadAttributesExcludeForBroker;
  } else if (query.select === EUserRole.Carrier) {
    exclude = loadAttributesExcludeForCarrier;
  }

  const result = await Load.findAll({
    where: query.where,
    attributes: { exclude },
    order: [["id", "ASC"]],
    include: [
      {
        model: LoadStop,
        as: "load_stops",
        attributes: { exclude: loadStopAttributesExclude },
      },
      {
        model: Driver,
        as: "primary_driver",
        attributes: ["id", "first_name", "last_name", "email"]
      },
      {
        model: Driver,
        as: "secondary_driver",
        attributes: ["id", "first_name", "last_name", "email"]
      },
      {
        model: Truck,
        attributes: ["id", "status", "brand", "model_year", "plate", "unit_number"]
      },
      {
        model: Trailer,
        attributes: ["id", "status", "brand", "model_year", "plate", "unit_number"]
      }
    ],

    transaction: query.transaction,
    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne, EUserRole>) {
  let exclude = loadAttributesExclude;

  if (query.select === EUserRole.Broker) {
    exclude = loadAttributesExcludeForBroker;
  } else if (query.select === EUserRole.Carrier) {
    exclude = loadAttributesExcludeForCarrier;
  }

  const result = await Load.findOne({
    where: query.where,
    attributes: { exclude },
    order: [["id", "ASC"]],
    include: [
      {
        model: LoadStop,
        as: "load_stops",
        attributes: { exclude: loadStopAttributesExclude },
      },
      {
        model: Driver,
        as: "primary_driver",
        attributes: ["id", "avatar", "first_name", "last_name", "email"]
      },
      {
        model: Driver,
        as: "secondary_driver",
        attributes: ["id", "avatar", "first_name", "last_name", "email"]
      },
      {
        model: Truck,
        attributes: ["id", "status", "brand", "model_year", "plate", "unit_number"]
      },
      {
        model: Trailer,
        attributes: ["id", "status", "brand", "model_year", "plate", "unit_number"]
      }
    ],
    transaction: query.transaction
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: ILoadCreate, query: Query<undefined> = {}) {
  const result = await Load.create(payload, { transaction: query.transaction });
  return result.toJSON();
}

export async function update(payload: ILoadUpdate, query: Query<WhereOne>) {
  const [result] = await Load.update(payload, {
    where: query.where, transaction: query.transaction
  });
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Load.destroy({
    where: query.where,
    transaction: query.transaction
  });
  return result;
}

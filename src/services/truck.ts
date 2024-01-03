import { ITruck, ITruckCreate, ITruckUpdate, Truck } from "../models";

export type WhereMany = Pick<ITruck, "carrier_id"> & Partial<Pick<ITruck, "status">>
export type WhereOne = Pick<ITruck, "id" | "carrier_id">

const truckAttributesExclude: Array<keyof ITruck> = ["created_at", "updated_at", "carrier_id"];

export async function count(query: Query<WhereMany>) {
  const result = await Truck.count({
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

  const result = await Truck.findAll({
    where: query.where,
    attributes: { exclude: truckAttributesExclude },
    ...options
  });

  return result.map(item => item.toJSON());
}

export async function all(query: Query<WhereMany>) {
  const trucks = await Truck.findAll({
    where: query.where,
    attributes: ["id", "unit_number"]
  });

  return trucks.map(truck => truck.toJSON());
}


export async function one(query: Query<WhereOne>) {
  const result = await Truck.findOne({
    where: query.where,
    attributes: { exclude: truckAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: ITruckCreate) {
  const result = await Truck.create(payload);
  return result.toJSON();
}

export async function update(payload: ITruckUpdate, query: Query<WhereOne>) {
  const [result] = await Truck.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Truck.destroy({
    where: query.where
  });
  return result;
}
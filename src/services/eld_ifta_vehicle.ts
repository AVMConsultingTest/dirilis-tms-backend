import { IEldIftaVehicle, IEldIftaVehicleCreate, IEldIftaVehicleUpdate, EldIftaVehicle, ITruck, Truck } from "../models";

export type WhereMany = Pick<IEldIftaVehicle, "carrier_id"> & Partial<Pick<IEldIftaVehicle, "vehicle_id" | "total_distance">>
export type WhereOne = Pick<IEldIftaVehicle, "id" | "carrier_id">

const eldIftaVehicleAttributesExclude: Array<keyof IEldIftaVehicle> = ["created_at", "updated_at", "carrier_id"];
const truckAttributesInclude: Array<keyof ITruck> = ["unit_number", "model"];

export async function count(query: Query<WhereMany>) {
  const result = await EldIftaVehicle.count({
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

  const result = await EldIftaVehicle.findAll({
    where: query.where,
    attributes: { exclude: eldIftaVehicleAttributesExclude },
    include: [{
      model: Truck,
      attributes: truckAttributesInclude
    }],

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await EldIftaVehicle.findOne({
    where: query.where,
    attributes: { exclude: eldIftaVehicleAttributesExclude },
    include: [{
      model: Truck,
      attributes: truckAttributesInclude
    }],
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IEldIftaVehicleCreate) {
  const result = await EldIftaVehicle.create(payload);
  return result.toJSON();
}

export async function update(payload: IEldIftaVehicleUpdate, query: Query<WhereOne>) {
  const [result] = await EldIftaVehicle.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await EldIftaVehicle.destroy({
    where: query.where
  });
  return result;
}
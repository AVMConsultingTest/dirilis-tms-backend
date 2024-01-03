import { IEldIftaIdlingEvent, IEldIftaIdlingEventCreate, IEldIftaIdlingEventUpdate, EldIftaIdlingEvent, ITruck, Truck } from "../models";

export type WhereMany = Pick<IEldIftaIdlingEvent, "carrier_id"> & Partial<Pick<IEldIftaIdlingEvent, "vehicle_id" | "driver_id">>
export type WhereOne = Pick<IEldIftaIdlingEvent, "id" | "carrier_id">

const eldIftaIdlingEventAttributesExclude: Array<keyof IEldIftaIdlingEvent> = ["created_at", "updated_at", "carrier_id"];
const truckAttributesInclude: Array<keyof ITruck> = ["unit_number", "model"];

export async function count(query: Query<WhereMany>) {
  const result = await EldIftaIdlingEvent.count({
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

  const result = await EldIftaIdlingEvent.findAll({
    where: query.where,
    attributes: { exclude: eldIftaIdlingEventAttributesExclude },
    include: [{
      model: Truck,
      attributes: truckAttributesInclude
    }],

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await EldIftaIdlingEvent.findOne({
    where: query.where,
    attributes: { exclude: eldIftaIdlingEventAttributesExclude },
    include: [{
      model: Truck,
      attributes: truckAttributesInclude
    }],
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IEldIftaIdlingEventCreate) {
  const result = await EldIftaIdlingEvent.create(payload);
  return result.toJSON();
}

export async function update(payload: IEldIftaIdlingEventUpdate, query: Query<WhereOne>) {
  const [result] = await EldIftaIdlingEvent.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await EldIftaIdlingEvent.destroy({
    where: query.where
  });
  return result;
}
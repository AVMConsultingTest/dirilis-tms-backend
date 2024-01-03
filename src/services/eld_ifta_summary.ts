import { IEldIftaSummary, IEldIftaSummaryCreate, IEldIftaSummaryUpdate, EldIftaSummary, ITruck, Truck } from "../models";

export type WhereMany = Pick<IEldIftaSummary, "carrier_id"> & Partial<Pick<IEldIftaSummary, "jurisdiction" | "vehicle_id" | "driver_id">>
export type WhereOne = Pick<IEldIftaSummary, "id" | "carrier_id">

const eldIftaSummaryAttributesExclude: Array<keyof IEldIftaSummary> = ["created_at", "updated_at", "carrier_id"];
const truckAttributesInclude: Array<keyof ITruck> = ["unit_number", "model"];

export async function count(query: Query<WhereMany>) {
  const result = await EldIftaSummary.count({
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

  const result = await EldIftaSummary.findAll({
    where: query.where,
    attributes: { exclude: eldIftaSummaryAttributesExclude },
    include: [{
      model: Truck,
      attributes: truckAttributesInclude
    }],

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await EldIftaSummary.findOne({
    where: query.where,
    attributes: { exclude: eldIftaSummaryAttributesExclude },
    include: [{
      model: Truck,
      attributes: truckAttributesInclude
    }],
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IEldIftaSummaryCreate) {
  const result = await EldIftaSummary.create(payload);
  return result.toJSON();
}

export async function update(payload: IEldIftaSummaryUpdate, query: Query<WhereOne>) {
  const [result] = await EldIftaSummary.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await EldIftaSummary.destroy({
    where: query.where
  });
  return result;
}
import { IEldIftaFuelPurchase, IEldIftaFuelPurchaseCreate, IEldIftaFuelPurchaseUpdate, EldIftaFuelPurchase, ITruck, Truck } from "../models";

export type WhereMany = Pick<IEldIftaFuelPurchase, "carrier_id"> & Partial<Pick<IEldIftaFuelPurchase, "source" | "fuel_type" | "vehicle_id" | "jurisdiction">>
export type WhereOne = Pick<IEldIftaFuelPurchase, "id" | "carrier_id">

const eldIftaFuelPurchaseAttributesExclude: Array<keyof IEldIftaFuelPurchase> = ["created_at", "updated_at", "carrier_id"];
const truckAttributesInclude: Array<keyof ITruck> = ["unit_number", "model"];

export async function count(query: Query<WhereMany>) {
  const result = await EldIftaFuelPurchase.count({
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

  const result = await EldIftaFuelPurchase.findAll({
    where: query.where,
    attributes: { exclude: eldIftaFuelPurchaseAttributesExclude },
    include: [{
      model: Truck,
      attributes: truckAttributesInclude
    }],

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await EldIftaFuelPurchase.findOne({
    where: query.where,
    attributes: { exclude: eldIftaFuelPurchaseAttributesExclude },
    include: [{
      model: Truck,
      attributes: truckAttributesInclude
    }],
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IEldIftaFuelPurchaseCreate) {
  const result = await EldIftaFuelPurchase.create(payload);
  return result.toJSON();
}

export async function update(payload: IEldIftaFuelPurchaseUpdate, query: Query<WhereOne>) {
  const [result] = await EldIftaFuelPurchase.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await EldIftaFuelPurchase.destroy({
    where: query.where
  });
  return result;
}
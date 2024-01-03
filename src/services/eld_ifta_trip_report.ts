import { IEldIftaTripReport, IEldIftaTripReportCreate, IEldIftaTripReportUpdate, EldIftaTripReport, ITruck, Truck } from "../models";

export type WhereMany = Pick<IEldIftaTripReport, "carrier_id"> & Partial<Pick<IEldIftaTripReport, "vehicle_id">>
export type WhereOne = Pick<IEldIftaTripReport, "id" | "carrier_id">

const eldIftaTripReportAttributesExclude: Array<keyof IEldIftaTripReport> = ["created_at", "updated_at", "carrier_id"];
const truckAttributesInclude: Array<keyof ITruck> = ["unit_number", "model"];

export async function count(query: Query<WhereMany>) {
  const result = await EldIftaTripReport.count({
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

  const result = await EldIftaTripReport.findAll({
    where: query.where,
    attributes: { exclude: eldIftaTripReportAttributesExclude },
    include: [{
      model: Truck,
      attributes: truckAttributesInclude
    }],

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await EldIftaTripReport.findOne({
    where: query.where,
    attributes: { exclude: eldIftaTripReportAttributesExclude },
    include: [{
      model: Truck,
      attributes: truckAttributesInclude
    }],
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IEldIftaTripReportCreate) {
  const result = await EldIftaTripReport.create(payload);
  return result.toJSON();
}

export async function update(payload: IEldIftaTripReportUpdate, query: Query<WhereOne>) {
  const [result] = await EldIftaTripReport.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await EldIftaTripReport.destroy({
    where: query.where
  });
  return result;
}
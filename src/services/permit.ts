/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPermit, IPermitCreate, IPermitUpdate, Permit } from "../models";

export type WhereMany = Pick<IPermit, "carrier_id"> & Partial<Pick<IPermit, "type" | "truck_id" | "start_date" | "end_date">>
export type WhereOne = Pick<IPermit, "id" | "carrier_id">

const permitAttributesExclude: Array<keyof IPermit> = ["created_at", "updated_at", "carrier_id"];

export async function count(query: Query<WhereMany>) {
  const result = await Permit.count({
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

  const result = await Permit.findAll({
    where: query.where,
    attributes: { exclude: permitAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await Permit.findOne({
    where: query.where,
    attributes: { exclude: permitAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IPermitCreate) {
  const result = await Permit.create(payload);
  return result.toJSON();
}

export async function update(payload: IPermitUpdate, query: Query<WhereOne>) {
  const [result] = await Permit.update(payload, query);
  return result;
}

export async function expiringSummary(query: Query<WhereMany | any> | any) {
  const result = await Permit.findAndCountAll({
    where: query.where,
    attributes: query.attributes,
    group: query.group,
  });

  return result.rows.map(item => item.toJSON() as IPermit & { expiring_count: string });
}

export async function remove(query: Query<WhereOne>) {
  const result = await Permit.destroy({
    where: query.where
  });
  return result;
}


export function summaryAsObject(permits: (IPermit & { expiring_count: string })[]) {
  const object: any = {};

  for (const item of permits) {
    if (object[item.type]) {
      object[item.type] = Number(item.expiring_count);
    } else {
      object[item.type] = Number(item.expiring_count);
    }
  }

  return object;
}
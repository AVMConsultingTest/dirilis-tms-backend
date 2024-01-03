import { IInspection, IInspectionCreate, IInspectionUpdate, Inspection } from "../models";

export type WhereMany = Pick<IInspection, "carrier_id"> & Partial<Pick<IInspection, "category">>
export type WhereOne = Pick<IInspection, "id" | "carrier_id">

const inspectionAttributesExclude: Array<keyof IInspection> = ["created_at", "updated_at", "carrier_id"];

export async function count(query: Query<WhereMany>) {
  const result = await Inspection.count({
    where: query.where
  });
  return result;
}

export async function groupAndCount(query: Query<WhereMany>) {
  const result = await Inspection.count({
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

  const result = await Inspection.findAll({
    where: query.where,
    attributes: { exclude: inspectionAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await Inspection.findOne({
    where: query.where,
    attributes: { exclude: inspectionAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IInspectionCreate) {
  const result = await Inspection.create(payload);
  return result.toJSON();
}

export async function update(payload: IInspectionUpdate, query: Query<WhereOne>) {
  const [result] = await Inspection.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Inspection.destroy({
    where: query.where
  });
  return result;
}
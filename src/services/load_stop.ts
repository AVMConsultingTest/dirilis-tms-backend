import { ILoadStop, ILoadStopCreate, ILoadStopUpdate, LoadStop } from "../models";

export type WhereMany = Partial<Pick<ILoadStop, "load_id">>
export type WhereOne = Pick<ILoadStop, "id" | "load_id">

const loadStopAttributesExclude: Array<keyof ILoadStop> = ["created_at", "updated_at"];

export async function count(query: Query<WhereMany>) {
  const result = await LoadStop.count({
    where: query.where,
    transaction: query.transaction
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

  const result = await LoadStop.findAll({
    where: query.where,
    attributes: { exclude: loadStopAttributesExclude },

    transaction: query.transaction,
    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await LoadStop.findOne({
    where: query.where,
    attributes: { exclude: loadStopAttributesExclude },
    transaction: query.transaction
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: ILoadStopCreate, query: Query<undefined> = { where: undefined }) {
  const result = await LoadStop.create(payload, { transaction: query.transaction });
  return result.toJSON();
}

export async function update(payload: ILoadStopUpdate, query: Query<WhereOne>) {
  const [result] = await LoadStop.update(payload, {
    where: query.where,
    transaction: query.transaction
  });
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await LoadStop.destroy({
    where: query.where,
    transaction: query.transaction
  });
  return result;
}
import { ITraining, ITrainingCreate, ITrainingUpdate, Training } from "../models";

export type WhereMany = Pick<ITraining, "carrier_id"> & Partial<Pick<ITraining, "type" | "status" | "cadence" | "employee_type" | "driver_id">>
export type WhereOne = Pick<ITraining, "id" | "carrier_id">

const trainingAttributesExclude: Array<keyof ITraining> = ["created_at", "updated_at", "carrier_id"];

export async function count(query: Query<WhereMany>) {
  const result = await Training.count({
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

  const result = await Training.findAll({
    where: query.where,
    attributes: { exclude: trainingAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await Training.findOne({
    where: query.where,
    attributes: { exclude: trainingAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: ITrainingCreate) {
  const result = await Training.create(payload);
  return result.toJSON();
}

export async function update(payload: ITrainingUpdate, query: Query<WhereOne>) {
  const [result] = await Training.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Training.destroy({
    where: query.where
  });
  return result;
}

export async function searchById(query: Query<WhereMany>) {
  const result = await Training.findAll({
    where: query.where,
    attributes: { exclude: trainingAttributesExclude },
  });

  return result.map(item => item.toJSON());
}
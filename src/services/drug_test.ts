import { IDrugTest, IDrugTestCreate, IDrugTestUpdate, DrugTest } from "../models";

export type WhereMany = Pick<IDrugTest, "carrier_id"> & Partial<Pick<IDrugTest, "status" | "driver_id" | "type">>
export type WhereOne = Pick<IDrugTest, "id" | "carrier_id">

const drugTestAttributesExclude: Array<keyof IDrugTest> = ["created_at", "updated_at", "carrier_id"];

export async function count(query: Query<WhereMany>) {
  const result = await DrugTest.count({
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

  const result = await DrugTest.findAll({
    where: query.where,
    attributes: { exclude: drugTestAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await DrugTest.findOne({
    where: query.where,
    attributes: { exclude: drugTestAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IDrugTestCreate) {
  const result = await DrugTest.create(payload);
  return result.toJSON();
}

export async function update(payload: IDrugTestUpdate, query: Query<WhereOne>) {
  const [result] = await DrugTest.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await DrugTest.destroy({
    where: query.where
  });
  return result;
}
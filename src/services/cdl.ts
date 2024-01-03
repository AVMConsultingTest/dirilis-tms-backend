import { ICdlCreate, ICdlUpdate, Cdl, ICdl } from "../models";

export type WhereOne = Pick<ICdl, "id" | "carrier_id">


export async function create(payload: ICdlCreate, query: Query<undefined>) {
  const result = await Cdl.create(payload, { transaction: query.transaction });
  return result.toJSON();
}

export async function update(payload: ICdlUpdate, query: Query<WhereOne>) {
  const [result] = await Cdl.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Cdl.destroy({
    where: query.where
  });
  return result;
}
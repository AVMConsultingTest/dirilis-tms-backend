import { ISambaCredential, ISambaCredentialCreate, ISambaCredentialUpdate, SambaCredential } from "../models";

export type WhereMany = Pick<ISambaCredential, "carrier_id">
export type WhereOne = Pick<ISambaCredential, "id" | "carrier_id">

const sambaCredentialAttributesExclude: Array<keyof ISambaCredential> = ["created_at", "updated_at", "carrier_id"];

export async function count(query: Query<WhereMany>) {
  const result = await SambaCredential.count({
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

  const result = await SambaCredential.findAll({
    where: query.where,
    attributes: { exclude: sambaCredentialAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await SambaCredential.findOne({
    where: query.where,
    attributes: { exclude: sambaCredentialAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: ISambaCredentialCreate) {
  const result = await SambaCredential.create(payload);
  return result.toJSON();
}

export async function update(payload: ISambaCredentialUpdate, query: Query<WhereOne>) {
  const [result] = await SambaCredential.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await SambaCredential.destroy({
    where: query.where
  });
  return result;
}
import { IPermission, IPermissionCreate, IPermissionUpdate, Permission } from "../models";

export type WhereMany = Pick<IPermission, "company_id">
export type WhereOne = Pick<IPermission, "id" | "company_id">

const permissionAttributesExclude: Array<keyof IPermission> = ["id", "created_at", "updated_at", "company_id"];

export async function count(query: Query<WhereMany>) {
  const result = await Permission.count({
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

  const result = await Permission.findAll({
    where: query.where,
    attributes: { exclude: permissionAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await Permission.findOne({
    where: query.where,
    attributes: { exclude: permissionAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IPermissionCreate, query: Query<undefined>) {
  const result = await Permission.create(payload, { transaction: query.transaction });
  return result.toJSON();
}

export async function update(payload: IPermissionUpdate, query: Query<WhereOne>) {
  const [result] = await Permission.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Permission.destroy({
    where: query.where
  });
  return result;
}
import { IPermission, IRole, IRoleCreate, IRoleUpdate, Permission, Role } from "../models";

export type WhereMany = Pick<IRole, "company_id">
export type WhereOne = Pick<IRole, "id" | "company_id">

const roleAttributesExclude: Array<keyof IRole> = ["created_at", "updated_at", "company_id"];
const permissionAttributesInclude: Array<keyof IPermission> = ["id", "route", "can_read", "can_write"];

export async function count(query: Query<WhereMany>) {
  const result = await Role.count({
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
      include: [
        {
          model: Permission,
          attributes: permissionAttributesInclude
        }
      ]
    };
  }

  const result = await Role.findAll({
    where: query.where,
    attributes: { exclude: roleAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await Role.findOne({
    where: query.where,
    attributes: { exclude: roleAttributesExclude },
    include: [
      {
        model: Permission,
        attributes: permissionAttributesInclude
      }
    ]
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IRoleCreate, query: Query<undefined>) {
  const result = await Role.create(payload, { transaction: query.transaction });
  return result.toJSON();
}

export async function update(payload: IRoleUpdate, query: Query<WhereOne>) {
  const [result] = await Role.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Role.destroy({
    where: query.where
  });
  return result;
}
import { IPermission, IRole, IUserRole, IUserRoleCreate, IUserRoleUpdate, Permission, Role, UserRole } from "../models";

export type WhereMany = Pick<IUserRole, "company_id"> & Partial<Pick<IUserRole, "user_id">>
export type WhereOne = Pick<IUserRole, "id" | "company_id">

const userRoleAttributesExclude: Array<keyof IUserRole> = ["created_at", "updated_at", "company_id"];
const roleAttributesInclude: Array<keyof IRole> = ["name"];
const permissionAttributesInclude: Array<keyof IPermission> = ["id", "route", "can_read", "can_write"];

export async function count(query: Query<WhereMany>) {
  const result = await UserRole.count({
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

  const result = await UserRole.findAll({
    where: query.where,
    attributes: { exclude: userRoleAttributesExclude },
    include: [
      {
        model: Role,
        attributes: roleAttributesInclude,
        include: [
          {
            model: Permission,
            attributes: permissionAttributesInclude
          }
        ]
      },
    ],
    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await UserRole.findOne({
    where: query.where,
    attributes: { exclude: userRoleAttributesExclude },
    include: [
      {
        model: Role,
        attributes: roleAttributesInclude,
        include: [
          {
            model: Permission,
            attributes: permissionAttributesInclude
          }
        ]
      },
    ]
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IUserRoleCreate) {
  const result = await UserRole.create(payload);
  return result.toJSON();
}

export async function update(payload: IUserRoleUpdate, query: Query<WhereOne>) {
  const [result] = await UserRole.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await UserRole.destroy({
    where: query.where
  });
  return result;
}
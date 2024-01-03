import { Includeable } from "sequelize";
import { Company, IUser, IUserCreate, IUserUpdate, User, ICompany, IUserRole, UserRole, Role, IRole, Permission, IPermission } from "../models";
import * as bcrypt from "bcrypt";

export type WhereMany = Partial<Pick<IUser, "company_id">>
export type WhereOne = Partial<Pick<IUser, "company_id" | "username" | "id" | "email">>
export type WhereOneByEmailAndPassword = Pick<IUser, "email" | "password">

const userAttributesExclude: Array<keyof IUser> = ["created_at", "updated_at", "password"];
const userAttributesIncludeForLogin: Array<keyof IUser> = ["username", "password", "company_id", "role", "is_password_changed", "id"];
const companyAttributesInclude: Array<keyof ICompany> = ["name"];
const userRoleAttributesInclude: Array<keyof IUserRole> = ["role_id"];
const roleAttributesInclude: Array<keyof IRole> = ["name"];
const permissionAttributesInclude: Array<keyof IPermission> = ["route", "can_read", "can_write"];

const userRoleInclude: Includeable[] = [
  {
    model: UserRole,
    attributes: userRoleAttributesInclude,
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
  }
];

const companyInclude: Includeable[] = [
  {
    model: Company,
    attributes: companyAttributesInclude
  }
];

export async function count(query: Query<WhereMany>) {
  const result = await User.count({
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

  const result = await User.findAll({
    where: query.where,
    attributes: { exclude: userAttributesExclude },
    include: [
      ...userRoleInclude,
      ...companyInclude
    ],

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await User.findOne({
    where: query.where,
    attributes: { exclude: userAttributesExclude },
    include: [
      ...userRoleInclude,
      ...companyInclude
    ]
  });

  return result ? result.toJSON() : null;
}

export async function oneByEmailAndPassword (query: Query<WhereOneByEmailAndPassword>) {
  const { password, ...where } = query.where;

  const result = await User.findOne({
    where,
    attributes: userAttributesIncludeForLogin
  });

  if(!result) return null;

  const isMatch = await bcrypt.compare(password, result.password);
  if(!isMatch) return null;

  return result.toJSON();
}

export async function create(payload: IUserCreate) {
  payload.password = await bcrypt.hash(payload.password, 8);
  const result = await User.create(payload);
  return result.toJSON();
}

export async function update(payload: IUserUpdate, query: Query<WhereOne>) {
  if(payload.password) payload.password = await bcrypt.hash(payload.password, 8);
  const [result] = await User.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await User.destroy({
    where: query.where
  });
  return result;
}

setTimeout(() => {
  const updateUserQuery: Query<WhereOne> = {
    where: {
      id: 1,
      company_id: null
    }
  };
  
  update({ first_name: "Updated" }, updateUserQuery).then(console.log);
}, 10000);
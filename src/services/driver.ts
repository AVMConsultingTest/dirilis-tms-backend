import { FindAttributeOptions } from "sequelize";
import { sequelize } from "../configs";
import { IDriver, IDriverCreate, IDriverUpdate, Driver, ICdl, IUser, Cdl, User } from "../models";

export type WhereMany = Pick<IDriver, "carrier_id"> & Partial<Pick<IDriver, "status" | "type" | "substatus">>
export type WhereOne = Pick<IDriver, "id" | "carrier_id">
const driverAttributesExclude: Array<keyof IDriver> = ["created_at", "updated_at", "carrier_id", "samba_id", "samba_license_id"];
const cdlAttributesExclude: Array<keyof ICdl> = ["created_at", "updated_at", "driver_id", "carrier_id", "user_id"];
const userAttributesInclude: FindAttributeOptions | Array<keyof IUser> = [
  [sequelize.fn("concat", sequelize.col("cdls->user.first_name"), " ", sequelize.col("cdls->user.last_name")), "name"],
  "is_owner"
];

export async function count(query: Query<WhereMany>) {
  const result = await Driver.count({
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

  const result = await Driver.findAll({
    where: query.where,
    attributes: { exclude: driverAttributesExclude },
    include: [
      {
        model: Cdl,
        attributes: { exclude: cdlAttributesExclude },
        include: [
          {
            model: User,
            attributes: userAttributesInclude
          }
        ]
      }
    ],
    ...options
  });

  return result.map(item => item.toJSON());
}

export async function all(query: Query<WhereMany>) {
  console.log(query);
  const drivers = await Driver.findAll({
    where: query.where,
    attributes: ["id", "first_name", "last_name"]
  });

  return drivers.map(driver => driver.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await Driver.findOne({
    where: query.where,
    attributes: { exclude: driverAttributesExclude },
    include: [
      {
        model: Cdl,
        attributes: { exclude: cdlAttributesExclude },
        include: [
          {
            model: User,
            attributes: userAttributesInclude
          }
        ]
      }
    ],
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IDriverCreate, query: Query<undefined>) {
  const result = await Driver.create(payload, { transaction: query.transaction });
  return result.toJSON();
}

export async function update(payload: IDriverUpdate, query: Query<WhereOne>) {
  const [result] = await Driver.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Driver.destroy({
    where: query.where
  });
  return result;
}
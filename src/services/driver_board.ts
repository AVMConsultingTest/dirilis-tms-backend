import { FindAttributeOptions, Op } from "sequelize";
import { sequelize } from "../configs";
import { IDriverBoardCreate, IDriverBoardUpdate, DriverBoard, Driver, IDriver, IDriverBoardGet, IDriverBoard } from "../models";

export type WhereMany = Pick<IDriverBoardCreate, "carrier_id">;
export type WhereOne = Pick<IDriverBoardCreate, "id" | "carrier_id">

const driverBoardAttributesExclude: Array<keyof IDriverBoardCreate> = ["created_at", "updated_at", "carrier_id"];
const driverAttributesInclude: FindAttributeOptions | Array<keyof IDriver> = [
  "email",
  "contact_phone_number",
  "type",
  "status",
  [sequelize.fn("concat", sequelize.col("first_name"), " ", sequelize.col("last_name")), "name"]
];
export async function countDriverBoard(query: Query<WhereMany>) {
  const result = await DriverBoard.count({
    where: query.where
  });
  return result;
}
export async function manyDriverBoard(query: Query<WhereMany>) {
  let options = {};

  if (query.page_number && query.page_size) {
    const offset = (query.page_number - 1) * query.page_size;
    options = {
      offset,
      limit: query.page_size,
    };
  }

  const result = await DriverBoard.findAll({
    where: query.where,
    attributes: { exclude: driverBoardAttributesExclude },
    nest: false,
    include: [
      {
        model: Driver,
        attributes: driverAttributesInclude,
      }
    ],
    ...options
  });

  return result.map((item: any) => {
    item = item.toJSON();
    item = { ...item, ...item.driver };
    delete item.driver;
    return item;
  });
}

export async function oneDriverBoard(query: Query<WhereOne>) {
  const result = await DriverBoard.findOne({
    where: query.where,
    attributes: { exclude: driverBoardAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function createDriverBoard(payload: IDriverBoardCreate) {
  const result = await DriverBoard.create(payload);
  return result.toJSON();
}

export async function updateDriverBoard(payload: IDriverBoardUpdate, query: Query<WhereOne>) {
  const [result] = await DriverBoard.update(payload, query);
  return result;
}

export async function removeDriverBoard(query: Query<WhereOne>) {
  const result = await DriverBoard.destroy({
    where: query.where
  });
  return result;
}

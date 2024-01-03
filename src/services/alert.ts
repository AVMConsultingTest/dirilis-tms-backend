import { IAlert, IAlertCreate, IAlertUpdate, Alert, Driver, IDriver } from "../models";

export type WhereMany = Pick<IAlert, "carrier_id"> & Partial<Pick<IAlert, "status" | "driver_id">>
export type WhereOne = Pick<IAlert, "id" | "carrier_id">

const alertAttributesExclude: Array<keyof IAlert> = ["created_at", "updated_at", "carrier_id"];
const driverAttributesInclude: Array<keyof IDriver> = ["first_name", "last_name"];

export async function count(query: Query<WhereMany>) {
  const result = await Alert.count({
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

  const result = await Alert.findAll({
    where: query.where,
    attributes: { exclude: alertAttributesExclude },

    include: [{
      model: Driver,
      attributes: driverAttributesInclude
    }],
    ...options
  });

  return result.map(item => {
    const jsonItem = item.toJSON();
    jsonItem.driver_name = `${jsonItem.driver.first_name} ${jsonItem.driver.last_name}`;
    delete jsonItem.driver;
    return jsonItem;
  });
}

export async function one(query: Query<WhereOne>) {
  const result = await Alert.findOne({
    where: query.where,
    attributes: { exclude: alertAttributesExclude },
    include: [{
      model: Driver,
      attributes: driverAttributesInclude
    }]
  });

  // add driver name
  if (result) {
    const jsonItem = result.toJSON();
    jsonItem.driver_name = `${jsonItem.driver.first_name} ${jsonItem.driver.last_name}`;
    delete jsonItem.driver;
    return jsonItem;
  } else {
    return null;
  }
}

export async function create(payload: IAlertCreate) {
  const result = await Alert.create(payload);
  return result.toJSON();
}

export async function update(payload: IAlertUpdate, query: Query<WhereOne>) {
  const [result] = await Alert.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Alert.destroy({
    where: query.where
  });
  return result;
}
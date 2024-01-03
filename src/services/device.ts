import { IDevice, IDeviceCreate, IDeviceUpdate, Device } from "../models";

export type WhereMany = Pick<IDevice, "carrier_id"> & Partial<Pick<IDevice, "truck_id" | "timeRange">>
export type WhereOne = Pick<IDevice, "id" | "carrier_id">

const deviceAttributesExclude: Array<keyof IDevice> = ["created_at", "updated_at", "carrier_id"];

export async function count(query: Query<WhereMany>) {
  const result = await Device.count({
    where: query.where
  });
  return result;
}

export async function findAndCountAll(query: Query<WhereMany | any> | any) {
  const req: any = {
    where: query.where
  };
  if (query.attributes) {
    req.attributes = query.attributes;
  }
  if (query.group) {
    req.group = query.group;
  }
  const result = await Device.findAndCountAll(req);
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

  const result = await Device.findAll({
    where: query.where,
    attributes: { exclude: deviceAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await Device.findOne({
    where: query.where,
    attributes: { exclude: deviceAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IDeviceCreate) {
  const result = await Device.create(payload);
  return result.toJSON();
}

export async function update(payload: IDeviceUpdate, query: Query<WhereOne>) {
  const [result] = await Device.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Device.destroy({
    where: query.where
  });
  return result;
}
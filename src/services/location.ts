import { Location } from "../models";
import { ILocation, ILocationCreate, ILocationUpdate } from "../models/index";
import { Op } from "sequelize";

export type WhereMany = Pick<ILocation, "carrier_id"> & Partial<Pick<ILocation, "status" | "name">>;
export type WhereOne = Pick<ILocation, "id" | "carrier_id">;

const locationAttributesExclude: Array<keyof ILocation> = ["created_at", "updated_at", "carrier_id"];

export async function count(query: Query<WhereMany>) {
  const result = await Location.count({
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

  const result = await Location.findAll({
    where: query.where,
    attributes: { exclude: locationAttributesExclude },
    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await Location.findOne({
    where: query.where,
    attributes: { exclude: locationAttributesExclude },
  });

  return result?.toJSON();
}

export async function create(data: ILocationCreate) {
  const result = await Location.create(data);
  return result.toJSON();
}

export async function update(payload: ILocationUpdate, query: Query<WhereOne>) {
  const [result] = await Location.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Location.destroy({
    where: query.where
  });
  return result;
}

export async function searchByName(query: Query<WhereMany>) {
  const result = await Location.findAll({
    where: {
      name: {
        [Op.iLike]: `%${query.where.name}%`
      },
      carrier_id: query.where.carrier_id
    },
    attributes: { exclude: locationAttributesExclude },
  });

  return result.map(item => item.toJSON());
}


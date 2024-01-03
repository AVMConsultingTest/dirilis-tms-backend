import { FindAttributeOptions } from "sequelize";
import { sequelize } from "../configs";
import { Driver, IDriver, IIncident, IIncidentCreate, IIncidentUpdate, Incident } from "../models";

export type WhereMany = Pick<IIncident, "carrier_id"> & Partial<Pick<IIncident, "event_type" | "truck_id" | "driver_id">>
export type WhereOne = Pick<IIncident, "id" | "carrier_id">

const incidentAttributesExclude: Array<keyof IIncident> = ["created_at", "updated_at", "carrier_id"];
const driverAttributesInclude: FindAttributeOptions | Array<keyof IDriver> = [
  [sequelize.fn("concat", sequelize.col("first_name"), " ", sequelize.col("last_name")), "name"]
];

export async function count(query: Query<WhereMany>) {
  const result = await Incident.count({
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

  const result = await Incident.findAll({
    where: query.where,
    attributes: { exclude: incidentAttributesExclude },
    include: [{
      model: Driver,
      attributes: driverAttributesInclude
    }],

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await Incident.findOne({
    where: query.where,
    attributes: { exclude: incidentAttributesExclude },
    include: [{
      model: Driver,
      attributes: driverAttributesInclude
    }],
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IIncidentCreate) {
  const result = await Incident.create(payload);
  return result.toJSON();
}

export async function update(payload: IIncidentUpdate, query: Query<WhereOne>) {
  const [result] = await Incident.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Incident.destroy({
    where: query.where
  });
  return result;
}
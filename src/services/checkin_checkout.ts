import { Driver, IDriver, ICheckinCheckout, ICheckinCheckoutCreate, ICheckinCheckoutUpdate, CheckinCheckout, ITruck, Truck } from "../models";
import { sequelize } from "../configs";

export type WhereMany = Pick<ICheckinCheckout, "carrier_id"> & Partial<Pick<ICheckinCheckout, "type" | "binder">>
export type WhereOne = Pick<ICheckinCheckout, "id" | "carrier_id">

const checkinCheckoutAttributesExclude: Array<keyof ICheckinCheckout> = ["created_at", "updated_at", "carrier_id"];
const driverAttributesInclude:Array<keyof IDriver> = [
  "avatar",
  "contact_phone_number"
];
const truckAttributesInclude: Array<keyof ITruck> = ["unit_number", "id", "vin_number", "plate"];

export async function count(query: Query<WhereMany>) {
  const result = await CheckinCheckout.count({
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

  const result = await CheckinCheckout.findAll({
    where: query.where,
    attributes: { exclude: checkinCheckoutAttributesExclude },
    include: [
      {
        model: Driver,
        attributes: [
          ...driverAttributesInclude,
          [sequelize.fn("concat", sequelize.col("primary_driver.first_name"), " ", sequelize.col("primary_driver.last_name")), "name"]
        ],
        as: "primary_driver"
      },
      {
        model: Driver,
        attributes: [
          ...driverAttributesInclude,
          [sequelize.fn("concat", sequelize.col("secondary_driver.first_name"), " ", sequelize.col("secondary_driver.last_name")), "name"]
        ],
        as: "secondary_driver"
      },
      {
        model: Truck,
        attributes: truckAttributesInclude
      }
    ],
    ...options
  });

  return result.map(item => item.toJSON());
}

export async function all(query: Query<WhereMany>) {
  const checkinCheckouts = await CheckinCheckout.findAll({
    where: query.where,
    attributes: ["id", "unit_number"]
  });

  return checkinCheckouts.map(checkinCheckout => checkinCheckout.toJSON());
}


export async function one(query: Query<WhereOne>) {
  const result = await CheckinCheckout.findOne({
    where: query.where,
    attributes: { exclude: checkinCheckoutAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: ICheckinCheckoutCreate) {
  const result = await CheckinCheckout.create(payload);
  return result.toJSON();
}

export async function update(payload: ICheckinCheckoutUpdate, query: Query<WhereOne>) {
  const [result] = await CheckinCheckout.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await CheckinCheckout.destroy({
    where: query.where
  });
  return result;
}
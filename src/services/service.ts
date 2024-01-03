/* eslint-disable @typescript-eslint/no-explicit-any */
import { Op } from "sequelize";
import { IService, IServiceCreate, IServiceUpdate, Service, ITruck, ITrailer, Truck, Trailer, IVendor, Vendor } from "../models";
import { EServiceVehicleType } from "../types";
import { sequelize } from "../configs";

export type WhereMany = Pick<IService, "carrier_id"> & Partial<Pick<IService, "type">>
export type WhereOne = Pick<IService, "id" | "carrier_id">

const serviceAttributesExclude: Array<keyof IService> = ["created_at", "updated_at", "carrier_id"];
const truckAttributesInclude: Array<keyof ITruck> = ["status", "id"];
const trailerAttributesInclude: Array<keyof ITrailer> = ["status", "id"];
const vendorAttributesInclude: Array<keyof IVendor> = ["email", "phone_number"];

export async function count(query: Query<WhereMany>) {
  const result = await Service.count({
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

  const result = await Service.findAll({
    where: query.where,
    attributes: { exclude: serviceAttributesExclude },
    include: [
      {
        model: Truck,
        attributes: truckAttributesInclude
      },
      {
        model: Trailer,
        attributes: trailerAttributesInclude
      },
      {
        model: Vendor,
        attributes: vendorAttributesInclude
      }
    ],
    nest: false,
    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await Service.findOne({
    where: query.where,
    attributes: { exclude: serviceAttributesExclude },
    include: [
      {
        model: Truck,
        attributes: truckAttributesInclude
      },
      {
        model: Trailer,
        attributes: trailerAttributesInclude
      },
      {
        model: Vendor,
        attributes: vendorAttributesInclude
      }
    ]
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IServiceCreate) {
  const result = await Service.create(payload);
  return result.toJSON();
}

export async function update(payload: IServiceUpdate, query: Query<WhereOne>) {
  const [result] = await Service.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Service.destroy({
    where: query.where
  });
  return result;
}

export async function expiringSummary(query: Query<WhereMany>) {
  const now = new Date();
  const start_date = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const end_date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  start_date.setHours(0, 0, 0, 0);
  end_date.setHours(0, 0, 0, 0);

  const result = await Service.findAll({
    where: {
      repair_completion_date: {
        [Op.between]: [start_date, end_date]
      },
      carrier_id: query.where.carrier_id
    },
    attributes: [
      "type",
      [sequelize.fn("COUNT", sequelize.col("id")), "expiring_count"]
    ],
    group: ["type"],
  });
  return result.map(item => item.toJSON() as IService & { expiring_count: string });
}

export function getSummaryAsObject(services: (IService & { expiring_count: string }) []) {
  const object: any = {};
  for(const item of services) {
    if(object[item.type]) {
      object[item.type] += Number(item.expiring_count);
    } else {
      object[item.type] = Number(item.expiring_count);
    }
  }
  return object;
}

export function toVehicle(serviceOrServices: IService | IService[]) {
  if (Array.isArray(serviceOrServices)) {
    for (const service of serviceOrServices)
      toVehicle(service);
    return;
  } else {
    const service = serviceOrServices;
    if (service.trailer) {
      service.vehicle_type = EServiceVehicleType.Trailer;
      service.vehicle_id = service.trailer_id;
      service.vehicle_status = service.trailer.status;
    } else if (service.truck) {
      service.vehicle_type = EServiceVehicleType.Truck;
      service.vehicle_id = service.truck_id;
      service.vehicle_status = service.truck.status;
    }

    delete service.trailer;
    delete service.truck;
    delete service.truck_id;
    delete service.trailer_id;
  }
}

export function fromVehicle(service: IService) {
  if(service.vehicle_type === EServiceVehicleType.Trailer) {
    service.trailer_id = service.vehicle_id;
    service.truck_id = null;
  } else {
    service.truck_id = service.vehicle_id;
    service.trailer_id = null;
  }

  delete service.vehicle_id;
  delete service.vehicle_type;
  delete service.vehicle_status;
}
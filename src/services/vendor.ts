import { IVendor, IVendorCreate, IVendorUpdate, Vendor } from "../models";

export type WhereMany = Pick<IVendor, "carrier_id"> & Partial<Pick<IVendor, "name" | "address_line1" | "address_line2" | "status" | "email" | "phone_number">>
export type WhereOne = Pick<IVendor, "id" | "carrier_id">

const vendorAttributesExclude: Array<keyof IVendor> = ["created_at", "updated_at", "carrier_id"];

export async function count(query: Query<WhereMany>) {
  const result = await Vendor.count({
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

  const result = await Vendor.findAll({
    where: query.where,
    attributes: { exclude: vendorAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await Vendor.findOne({
    where: query.where,
    attributes: { exclude: vendorAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IVendorCreate) {
  const result = await Vendor.create(payload);
  return result.toJSON();
}

export async function update(payload: IVendorUpdate, query: Query<WhereOne>) {
  const [result] = await Vendor.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Vendor.destroy({
    where: query.where
  });
  return result;
}
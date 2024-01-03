import { IBInvoice, IBInvoiceCreate, IBInvoiceUpdate, BInvoice } from "../models";

export type WhereMany = Pick<IBInvoice, "broker_id"> & Partial<Pick<IBInvoice, "number">>
export type WhereOne = Pick<IBInvoice, "id" | "broker_id">

const bInvoiceAttributesExclude: Array<keyof IBInvoice> = ["created_at", "updated_at", "broker_id"];

export async function count(query: Query<WhereMany>) {
  const result = await BInvoice.count({ 
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

  const result = await BInvoice.findAll({
    where: query.where,
    attributes: { exclude: bInvoiceAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await BInvoice.findOne({
    where: query.where,
    attributes: { exclude: bInvoiceAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IBInvoiceCreate) {
  const result = await BInvoice.create(payload);
  return result.toJSON();
}

export async function update(payload: IBInvoiceUpdate, query: Query<WhereOne>) {
  const [result] = await BInvoice.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await BInvoice.destroy({
    where: query.where
  });
  return result;
}
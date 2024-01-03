import { IFactoring, IFactoringCreate, IFactoringUpdate, Factoring } from "../models";

export type WhereMany = Pick<IFactoring, "carrier_id"> & Partial<Pick<IFactoring, "status" | "shipper_name" | "invoice_date" | "invoice_number">>
export type WhereOne = Pick<IFactoring, "id" | "carrier_id">

const factoringAttributesExclude: Array<keyof IFactoring> = ["created_at", "updated_at", "carrier_id"];

export async function count(query: Query<WhereMany>) {
  const result = await Factoring.count({
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

  const result = await Factoring.findAll({
    where: query.where,
    attributes: { exclude: factoringAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await Factoring.findOne({
    where: query.where,
    attributes: { exclude: factoringAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IFactoringCreate) {
  const result = await Factoring.create(payload);
  return result.toJSON();
}

export async function update(payload: IFactoringUpdate, query: Query<WhereOne>) {
  const [result] = await Factoring.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Factoring.destroy({
    where: query.where
  });
  return result;
}

interface TMSObject {
  DTR_NAME: string
  "INVOICE#": string
  INV_DATE: Date
  PO: string
  DESCR?: string
  INVAMT: number
}

export function toTMSObject(data: IFactoring) {
  const result: TMSObject = {
    DTR_NAME: data.shipper_name,
    "INVOICE#": data.invoice_number,
    INV_DATE: data.invoice_date,
    PO: data.reference_number,
    DESCR: data.notes,
    INVAMT: data.invoice_amount
  };

  return result;
}
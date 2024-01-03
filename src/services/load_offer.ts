import { Company, ICompany, ILoadOffer, ILoadOfferCreate, ILoadOfferUpdate, LoadOffer } from "../models";

export type WhereMany = Partial<Pick<ILoadOffer, "status" | "source" | "load_id" | "carrier_id">>
export type WhereOne = Pick<ILoadOffer, "id"> & Partial<Pick<ILoadOffer, "carrier_id" | "load_id" | "status">>

const loadOfferAttributesExclude: Array<keyof ILoadOffer> = ["updated_at"];
const companyAttributesInclude: Array<keyof ICompany> = ["logo", "name", "dot_number", "mc_number"];

export async function count(query: Query<WhereMany>) {
  const result = await LoadOffer.count({
    where: query.where,
    transaction: query.transaction
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

  const result = await LoadOffer.findAll({
    where: query.where,
    attributes: { exclude: loadOfferAttributesExclude },
    include: [
      {
        model: Company,
        attributes: companyAttributesInclude
      }
    ],
    transaction: query.transaction,
    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await LoadOffer.findOne({
    where: query.where,
    attributes: { exclude: loadOfferAttributesExclude },
    include: [
      {
        model: Company,
        attributes: companyAttributesInclude
      }
    ],
    transaction: query.transaction
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: ILoadOfferCreate, query: Query<undefined>) {
  const result = await LoadOffer.create(payload, { transaction: query.transaction });
  return result.toJSON();
}

export async function update(payload: ILoadOfferUpdate, query: Query<WhereOne | WhereMany>) {
  const [result] = await LoadOffer.update(payload, {
    where: query.where,
    transaction: query.transaction
  });
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await LoadOffer.destroy({
    where: query.where,
    transaction: query.transaction
  });
  return result;
}
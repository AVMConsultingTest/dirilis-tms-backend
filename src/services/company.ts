import { ICompany, ICompanyCreate, ICompanyUpdate, Company } from "../models";

export type WhereMany = Partial<Pick<ICompany, "name" | "type">>
export type WhereOne = Pick<ICompany, "id">

const companyAttributesExclude: Array<keyof ICompany> = ["created_at", "updated_at"];

export async function count(query: Query<WhereMany>) {
  const result = await Company.count({
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

  const result = await Company.findAll({
    where: query.where,
    attributes: { exclude: companyAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await Company.findOne({
    where: query.where,
    attributes: { exclude: companyAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: ICompanyCreate) {
  const result = await Company.create(payload);
  return result.toJSON();
}

export async function update(payload: ICompanyUpdate, query: Query<WhereOne>) {
  const [result] = await Company.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Company.destroy({
    where: query.where
  });
  return result;
}
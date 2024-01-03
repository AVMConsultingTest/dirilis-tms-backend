import { IApplicant, IApplicantCreate, IApplicantUpdate, Applicant } from "../models";

export type WhereMany = Pick<IApplicant, "carrier_id"> & Partial<Pick<IApplicant, "type" | "status">>
export type WhereOne = Pick<IApplicant, "id" | "carrier_id">

const applicantAttributesExclude: Array<keyof IApplicant> = ["created_at", "updated_at", "carrier_id"];

export async function count(query: Query<WhereMany | any> | any) {
  const result = await Applicant.count({
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

  const result = await Applicant.findAll({
    where: query.where,
    attributes: { exclude: applicantAttributesExclude },

    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await Applicant.findOne({
    where: query.where,
    attributes: { exclude: applicantAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IApplicantCreate) {
  const result = await Applicant.create(payload);
  return result.toJSON();
}

export async function update(payload: IApplicantUpdate, query: Query<WhereOne>) {
  const [result] = await Applicant.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Applicant.destroy({
    where: query.where
  });
  return result;
}
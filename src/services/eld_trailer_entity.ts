import { IEldTrailerEntity, IEldTrailerEntityCreate, IEldTrailerEntityUpdate, EldTrailerEntity, ITrailer, Trailer } from "../models";

export type WhereMany = Pick<IEldTrailerEntity, "carrier_id"> & Partial<Pick<IEldTrailerEntity, "status">>
export type WhereOne = Pick<IEldTrailerEntity, "id" | "carrier_id">

const eldTrailerEntityAttributesExclude: Array<keyof IEldTrailerEntity> = ["created_at", "updated_at", "carrier_id"];
const trailerAttributesInclude: Array<keyof ITrailer> = ["unit_number"];

export async function count(query: Query<WhereMany>) {
  const result = await EldTrailerEntity.count({
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

  const result = await EldTrailerEntity.findAll({
    where: query.where,
    attributes: { exclude: eldTrailerEntityAttributesExclude },
    include: [
      {
        model: Trailer,
        attributes: trailerAttributesInclude
      }
    ],
    ...options
  });

  return result.map(item => item.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await EldTrailerEntity.findOne({
    where: query.where,
    attributes: { exclude: eldTrailerEntityAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: IEldTrailerEntityCreate) {
  const result = await EldTrailerEntity.create(payload);
  return result.toJSON();
}

export async function update(payload: IEldTrailerEntityUpdate, query: Query<WhereOne>) {
  const [result] = await EldTrailerEntity.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await EldTrailerEntity.destroy({
    where: query.where
  });
  return result;
}
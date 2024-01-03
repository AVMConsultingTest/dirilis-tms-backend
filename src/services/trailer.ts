import { ITrailer, ITrailerCreate, ITrailerUpdate, Trailer } from "../models";

export type WhereMany = Pick<ITrailer, "carrier_id"> & Partial<Pick<ITrailer, "status">>
export type WhereOne = Pick<ITrailer, "id" | "carrier_id">

const trailerAttributesExclude: Array<keyof ITrailer> = ["created_at", "updated_at", "carrier_id"];

export async function count(query: Query<WhereMany>) {
  const result = await Trailer.count({
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

  const result = await Trailer.findAll({
    where: query.where,
    attributes: { exclude: trailerAttributesExclude },
    nest: false,
    ...options
  });

  return result.map(item => item.toJSON());
}

export async function all(query: Query<WhereMany>) {
  console.log(query);
  const trailers = await Trailer.findAll({
    where: query.where,
    attributes: ["id", "unit_number"]
  });

  return trailers.map(trailer => trailer.toJSON());
}

export async function one(query: Query<WhereOne>) {
  const result = await Trailer.findOne({
    where: query.where,
    attributes: { exclude: trailerAttributesExclude }
  });

  return result ? result.toJSON() : null;
}

export async function create(payload: ITrailerCreate) {
  const result = await Trailer.create(payload);
  return result.toJSON();
}

export async function update(payload: ITrailerUpdate, query: Query<WhereOne>) {
  const [result] = await Trailer.update(payload, query);
  return result;
}

export async function remove(query: Query<WhereOne>) {
  const result = await Trailer.destroy({
    where: query.where
  });
  return result;
}
import knex from "../../../clients/knex";
import { deserializePalette } from "./serialization";

const RECORD_LIMIT = 10;

export default async (req, res) => {
  if (req.method === "GET") {
    const {query} = req.query;
    const records = query ?
      await knex("palettes").where('name', 'like', `%${query}%`).limit(RECORD_LIMIT) :
      await knex("palettes").limit(RECORD_LIMIT)

    res.status(200).json(records.map(deserializePalette));

  } else if (req.method === "PUT") {
    res.status(404).json({error: `${req.method} endpoint does not exist`});
  }
}
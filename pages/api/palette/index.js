import knex from "../../../clients/knex";
import {serializePalette, deserializePalette} from "./serialization";

export default async (req, res) => {
  let {id} = req.query;
  if (req.method === "GET") {
    const {id} = req.query;
    const [palette] = await knex("palettes").where("id", id);
    res.status(200).json(palette);

  } else if (req.method === "PUT") {
    const serialized = serializePalette(req.body);
    if (id) {
      await knex("palettes")
        .where({id: req.query})
        .update(serialized);
    } else {
      [id] = await knex("palettes").insert(serialized)
    }

    const [record] = await knex("palettes")
      .where("id", id)
      .limit(1);

    res.status(200).json(deserializePalette(record));
  } else {

    res.status(404).json({error: `${req.method} endpoint does not exist`});
  }
};

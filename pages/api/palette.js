import knex from "../../clients/knex";

const serializePalette = (palette) => {
  const {id, name, colors} = palette;
  const color1 = colors[0];
  const color2 = colors[1];
  const color3 = colors[2];
  const color4 = colors[3];
  const color5 = colors[4];
  const res = {name, color1, color2, color3, color4, color5};
  if (id) {
    res.id = id;
  }
  return res;
}

const deserializePalette = (record) => {
  const colors = [];
  colors.push(record.color1)
  if (record.color1) {
    colors.push(record.color1);
    if (record.color2) {
      colors.push(record.color2);
      if (record.color3) {
        colors.push(record.color3);
        if (record.color4) {
          colors.push(record.color4);
        }
      }
    }
  }
  const palette = {
    id: record.id,
    name: record.name,
    colors,
  }
  return palette;
}

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

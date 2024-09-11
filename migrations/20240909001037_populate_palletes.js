/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex("palettes").insert([
    {name: "white and black", color1: "FFFFFF", color2: "000000"},
    {name: "RGB", color1: "FF0000", color2: "00FF00", color3: "0000FF"}
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex("palettes").removeAll();
};

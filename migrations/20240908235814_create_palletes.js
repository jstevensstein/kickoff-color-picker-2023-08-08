/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("palletes", function (table) {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.string("color1", 6).notNullable();
    table.string("color2", 6).nullable();
    table.string("color3", 6).nullable();
    table.string("color4", 6).nullable();
    table.string("color5", 6).nullable();
    // TODO: Add a regex check on these columns.
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("palletes");
};

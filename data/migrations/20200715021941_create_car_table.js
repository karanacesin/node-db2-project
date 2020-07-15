const { table } = require("../dataconfig");

exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
      tbl.increments("id")
      tbl.integer("VIN").unique().notNullable()
      tbl.string("Make", 50).notNullable()
      tbl.string("Model", 50).notNullable()
      tbl.integer("Mileage").notNullable()
      tbl.string("Transmission", 50)
      tbl.string("Title Status", 50)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars")
};

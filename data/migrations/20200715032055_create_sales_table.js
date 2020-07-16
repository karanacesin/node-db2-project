
exports.up = function(knex) {
    return knex.schema.createTable("sales", tbl => {
        tbl.increments("id")
        tbl.string("Seller Name", 100).notNullable()
        tbl.string("Sale Date", 50).notNullable()
        tbl.integer("Sale Price").notNullable()
        tbl.integer("VIN").unique().notNullable()
        tbl.foreign("VIN").references("cars.VIN")
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("sales")
};

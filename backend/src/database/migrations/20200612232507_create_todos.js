exports.up = function(knex) {
  return knex.schema.createTable('todos', function (table) {
    table.increments('id').primary();
    table.string('item').notNullable();
    table.integer('user_id').references('id').inTable('users');
    table.boolean('complete').defaultTo(false).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('todos');
};

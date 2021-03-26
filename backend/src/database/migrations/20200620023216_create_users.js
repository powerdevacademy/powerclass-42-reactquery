
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('username', 100).notNullable().unique();
        table.string('password', 100).notNullable();
        table.string('user_token', 100).notNullable();
        table.string('name', 100).notNullable();
        table.string('picture').notNullable();
        table.boolean('active').defaultTo(1).notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};

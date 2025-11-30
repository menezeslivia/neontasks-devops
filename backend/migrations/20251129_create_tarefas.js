exports.up = function(knex) {
  return knex.schema.createTable('tarefas', function(table) {
    table.increments('id').primary();
    table.text('texto').notNullable();
    table.boolean('concluida').notNullable().defaultTo(false);
    table.timestamp('criado_em').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tarefas');
};

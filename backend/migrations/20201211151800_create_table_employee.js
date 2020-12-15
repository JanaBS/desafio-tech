
exports.up = function(knex) {
  	return knex.schema.createTable('employee', table => {
		table.increments('id').primary()
		table.string('nome').notNull()
		table.integer('idade').notNull()
		table.string('cargo').notNull()
  })
};

exports.down = function(knex) {
	return knex.schema.dropTable('employee')
};

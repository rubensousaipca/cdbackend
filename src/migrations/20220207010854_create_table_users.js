exports.up = (knex) => {
    return knex.schema.createTable('users', (t) => {
      t.increments('id').primary();
      t.string('name').notNull();
      t.string('username').notNull().unique();
      t.string('email').notNull().unique();
      t.string('birthday').notNull();
      t.string('NIF').notNull().unique();
      t.string('BI').notNull().unique();
      t.string('gender').notNull();
      t.string('address').notNull();
      t.string('zip').notNull();
      t.string('location').notNull();
      t.string('password').notNull();
      t.boolean('admin').default(false);
    });
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTable('users');
  };

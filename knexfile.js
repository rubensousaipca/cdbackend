module.exports = {
  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'rubensousa24',
      database: 'cdapi',
    },
    debug: true,
    migrations: {
      directory: 'src/migrations',
    },
    seeds: {
      directory: 'src/seeds',
    },
    pool: {
      min: 0,
      max: 50,
      propagateCreateError: false,
    },
  },
};

// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: 'cutly',
      user:     'root',
      password: 'root'
    },
    migrations: {
      directory:'./src/database/migrations'
    }
  },
  /*development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/database.sqlite'
    },
    migrations: {
      directory:'./src/database/migrations'
    }
  },*/

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

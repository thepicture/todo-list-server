require('dotenv').config();

const KNEX_TEMPLATE = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: KNEX_TEMPLATE,
    test: KNEX_TEMPLATE,

    production: {
        ...KNEX_TEMPLATE,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};

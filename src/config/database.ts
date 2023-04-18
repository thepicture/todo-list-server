import dotenv from 'dotenv';
import knex from 'knex';

// @ts-ignore
import knexfile from '../../knexfile';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
export const db = require('knex')(knexfile[env]) as typeof knex;

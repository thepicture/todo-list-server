const bcrypt = require('bcrypt');

const STUB_PASSWORD = '123';
const PASSWORD_SALT = 10;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex('user').del();

    await knex('user').insert([
        {
            id: 1,
            firstName: 'Иван',
            lastName: 'Иванов',
            patronymic: 'Иванович',
            login: 'admin',
            passwordHash: bcrypt.hashSync(STUB_PASSWORD, PASSWORD_SALT),
            directorId: null,
        },
        {
            id: 2,
            firstName: 'Пётр',
            lastName: 'Петров',
            patronymic: 'Петрович',
            login: 'responsible',
            passwordHash: bcrypt.hashSync(STUB_PASSWORD, PASSWORD_SALT),
            directorId: 1,
        },
        {
            id: 3,
            firstName: 'Пётр',
            lastName: 'Иванов',
            patronymic: 'Петрович',
            login: 'responsible2',
            passwordHash: bcrypt.hashSync(STUB_PASSWORD, PASSWORD_SALT),
            directorId: 1,
        },
        {
            id: 4,
            firstName: 'Иван',
            lastName: 'Иванов',
            patronymic: 'Иванович',
            login: 'admin2',
            passwordHash: bcrypt.hashSync(STUB_PASSWORD, PASSWORD_SALT),
            directorId: null,
        },
        {
            id: 5,
            firstName: 'Иван',
            lastName: 'Петров',
            patronymic: 'Петрович',
            login: 'responsible5',
            passwordHash: bcrypt.hashSync(STUB_PASSWORD, PASSWORD_SALT),
            directorId: 2,
        },
        {
            id: 6,
            firstName: 'Иван',
            lastName: 'Иванов',
            patronymic: 'Петрович',
            login: 'responsible6',
            passwordHash: bcrypt.hashSync(STUB_PASSWORD, PASSWORD_SALT),
            directorId: 2,
        },
    ]);
};

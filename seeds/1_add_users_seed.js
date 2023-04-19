const bcrypt = require('bcrypt');

const STUB_PASSWORD = '123';
const PASSWORD_SALT = 10;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex('user').del();

    const firstDirectorId = await knex('user')
        .insert({
            firstName: 'Иван',
            lastName: 'Иванов',
            patronymic: 'Иванович',
            login: 'admin1',
            passwordHash: bcrypt.hashSync(STUB_PASSWORD, PASSWORD_SALT),
            directorId: null,
        })
        .returning('id')
        .then((row) => row[0].id);

    const secondDirectorId = await knex('user')
        .insert({
            firstName: 'Иван',
            lastName: 'Иванов',
            patronymic: 'Иванович',
            login: 'admin2',
            passwordHash: bcrypt.hashSync(STUB_PASSWORD, PASSWORD_SALT),
            directorId: null,
        })
        .returning('id')
        .then((row) => row[0].id);

    await knex('user').insert([
        {
            firstName: 'Пётр',
            lastName: 'Петров',
            patronymic: 'Петрович',
            login: 'responsible',
            passwordHash: bcrypt.hashSync(STUB_PASSWORD, PASSWORD_SALT),
            directorId: firstDirectorId,
        },
        {
            firstName: 'Пётр',
            lastName: 'Иванов',
            patronymic: 'Петрович',
            login: 'responsible2',
            passwordHash: bcrypt.hashSync(STUB_PASSWORD, PASSWORD_SALT),
            directorId: firstDirectorId,
        },
        {
            firstName: 'Иван',
            lastName: 'Петров',
            patronymic: 'Петрович',
            login: 'responsible3',
            passwordHash: bcrypt.hashSync(STUB_PASSWORD, PASSWORD_SALT),
            directorId: secondDirectorId,
        },
        {
            firstName: 'Иван',
            lastName: 'Иванов',
            patronymic: 'Петрович',
            login: 'responsible4',
            passwordHash: bcrypt.hashSync(STUB_PASSWORD, PASSWORD_SALT),
            directorId: secondDirectorId,
        },
    ]);
};

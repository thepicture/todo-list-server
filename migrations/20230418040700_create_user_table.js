/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('user', (table) => {
        table.increments('id');

        table.string('firstName').checkLength('<', 64).notNullable();
        table.string('lastName').checkLength('<', 64).notNullable();
        table.string('patronymic').checkLength('<', 64).notNullable();

        table.string('login').checkLength('<', 64).notNullable();
        table.string('passwordHash').checkLength('<', 128).notNullable();

        table
            .integer('directorId')
            .nullable()
            .references('user.id')
            .onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('user');
};

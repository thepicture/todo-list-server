/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('task', (table) => {
        table.increments('id');

        table.string('title').checkLength('<', 64).notNullable();
        table.string('description').checkLength('<', 1024).nullable();

        table.bigint('deadlineTimestamp').notNullable();
        table.bigint('creationTimestamp').notNullable();
        table.bigint('updateTimestamp').notNullable();

        table.enum('priority', ['low', 'medium', 'high']).notNullable();
        table
            .enum('status', ['todo', 'inprogress', 'done', 'cancelled'])
            .notNullable();

        table
            .integer('creatorId')
            .notNullable()
            .references('user.id')
            .onDelete('CASCADE');

        table
            .integer('responsibleUserId')
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

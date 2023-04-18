/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex('task').del();

    await knex('task').insert([
        {
            id: 1,

            title: 'Task 1',
            description: 'lorem ipsum lorem ipsum lorem ipsum',

            deadlineTimestamp: Date.now() + 1000 * 60,
            creationTimestamp: Date.now(),
            updateTimestamp: Date.now(),

            priority: 'high',
            status: 'todo',

            responsibleUserId: 2,
        },
        {
            id: 2,

            title: 'Task 2',
            description: 'lorem ipsum lorem ipsum lorem ipsum',

            deadlineTimestamp: Date.now() + 1000 * 120,
            creationTimestamp: Date.now(),
            updateTimestamp: Date.now(),

            priority: 'medium',
            status: 'inprogress',

            responsibleUserId: 2,
        },
        {
            id: 3,

            title: 'Task 3',
            description: 'lorem ipsum lorem ipsum',

            deadlineTimestamp: Date.now() - 1000 * 180,
            creationTimestamp: Date.now(),
            updateTimestamp: Date.now() - 100 * 60,

            priority: 'low',
            status: 'done',

            responsibleUserId: 3,
        },
        {
            id: 4,

            title: 'Task 4',
            description: 'lorem ipsum lorem ipsum',

            deadlineTimestamp: Date.now() - 1000 * 200,
            creationTimestamp: Date.now(),
            updateTimestamp: Date.now() - 100 * 60,

            priority: 'low',
            status: 'cancelled',

            responsibleUserId: 3,
        },
    ]);
};

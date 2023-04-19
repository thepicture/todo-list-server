const randomPick = (array) => array[Math.floor(Math.random() * array.length)];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex('task').del();

    const firstUserId = await knex('user')
        .select(['id'])
        .first()
        .then((row) => row.id);

    const directorIds = await knex('user')
        .select(['id'])
        .where({ directorId: null })
        .then((rows) => rows.map((row) => row.id));

    await knex('task').insert([
        {
            title: 'Task 1',
            description: 'lorem ipsum lorem ipsum lorem ipsum',

            deadlineTimestamp: Date.now() + 1000 * 60,
            creationTimestamp: Date.now(),
            updateTimestamp: Date.now(),

            priority: 'high',
            status: 'todo',

            creatorId: randomPick(directorIds),
            responsibleUserId: firstUserId,
        },
        {
            title: 'Task 2',
            description: 'lorem ipsum lorem ipsum lorem ipsum',

            deadlineTimestamp: Date.now() + 1000 * 120,
            creationTimestamp: Date.now(),
            updateTimestamp: Date.now(),

            priority: 'medium',
            status: 'inprogress',

            creatorId: randomPick(directorIds),
            responsibleUserId: firstUserId + 1,
        },
        {
            title: 'Task 3',
            description: 'lorem ipsum lorem ipsum',

            deadlineTimestamp: Date.now() - 1000 * 180,
            creationTimestamp: Date.now(),
            updateTimestamp: Date.now() - 100 * 60,

            priority: 'low',
            status: 'done',

            creatorId: randomPick(directorIds),
            responsibleUserId: firstUserId + 1,
        },
        {
            title: 'Task 4',
            description: 'lorem ipsum lorem ipsum',

            deadlineTimestamp: Date.now() - 1000 * 200,
            creationTimestamp: Date.now(),
            updateTimestamp: Date.now() - 100 * 60,

            priority: 'low',
            status: 'cancelled',

            creatorId: randomPick(directorIds),
            responsibleUserId: firstUserId + 2,
        },
        {
            title: 'Task 5',
            description:
                'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum',

            deadlineTimestamp: Date.now() + 1000 * 60 * 60 * 2,
            creationTimestamp: Date.now(),
            updateTimestamp: Date.now() - 100 * 60,

            priority: 'low',
            status: 'cancelled',

            creatorId: randomPick(directorIds),
            responsibleUserId: firstUserId + 2,
        },
    ]);
};

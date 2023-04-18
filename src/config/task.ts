import { STUB_USER } from './user';

export const MOCK_TASKS = [
    {
        id: 1,

        title: 'Task 1',
        description: 'lorem ipsum lorem ipsum lorem ipsum',

        deadlineTimestamp: Date.now() + 1000 * 60,
        creationTimestamp: Date.now(),
        updateTimestamp: Date.now(),

        priority: 'high',
        status: 'todo',

        responsibleUser: STUB_USER,
        responsibleUserId: STUB_USER.id,
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

        responsibleUser: STUB_USER,
        responsibleUserId: STUB_USER.id,
    },
    {
        id: 3,

        title: 'Task 3',
        description: 'lorem ipsum lorem ipsum',

        deadlineTimestamp: Date.now() - 1000 * 180,
        creationTimestamp: Date.now(),
        updateTimestamp: Date.now() - 100 * 60,

        priority: 'low',
        status: 'completed',

        responsibleUser: STUB_USER,
        responsibleUserId: STUB_USER.id,
    },
];

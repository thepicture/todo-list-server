import { StubTaskRepository } from 'models/Task';

import { TaskService } from './TaskService';

describe('task service', () => {
    const taskService = new TaskService(new StubTaskRepository());

    it('can fetch tasks', async () => {
        const expected = 3;

        const actual = await taskService.getTasks();

        expect(actual.length).toBe(expected);
    });
});

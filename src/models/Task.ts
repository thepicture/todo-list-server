import { db } from 'config/database';
import { MOCK_TASKS } from 'config/task';

import { mapAsTask } from 'utils/mappers';
import { taskSelector } from 'utils/selectors';

import { SessionUser, User } from './User';

export enum TaskPriorities {
    High,
    Medium,
    Low,
}

export enum TaskStatuses {
    ToDo,
    InProgress,
    Done,
    Cancelled,
}

export type Task = {
    id: number;

    title: string;
    description?: string;

    deadlineTimestamp: number;
    creationTimestamp: number;
    updateTimestamp: number;

    priority: TaskPriorities;
    status: TaskStatuses;

    responsibleUserId: number;
    responsibleUser: SessionUser;
};

export type TaskDto = Omit<Task, 'priority' | 'status'> & {
    priority: string;
    status: string;
};

export interface ITaskRepository {
    getAllTasks: () => Promise<TaskDto[]>;
}

export class TaskRepository implements ITaskRepository {
    async getAllTasks(): Promise<TaskDto[]> {
        return await db('task')
            .select<TaskDto[]>(taskSelector)
            .innerJoin('user', 'user.id', 'task.responsibleUserId')
            .then((rows) => rows.map(mapAsTask) as unknown as TaskDto[]);
    }
}

export class StubTaskRepository implements ITaskRepository {
    async getAllTasks(): Promise<TaskDto[]> {
        return MOCK_TASKS;
    }
}

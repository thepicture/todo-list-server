import { db } from 'config/database';
import { MOCK_TASKS } from 'config/task';

import { mapAsTask } from 'utils/mappers';
import { taskSelector } from 'utils/selectors';

import { SessionUser, UserRepository } from './User';

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

    creatorId: number;
    responsibleUserId: number;
    responsibleUser: SessionUser;
};

export type TaskDto = Omit<Task, 'priority' | 'status'> & {
    priority: string;
    status: string;
};

export class TaskSaveError extends Error {}

export interface ITaskRepository {
    getAllTasks: () => Promise<TaskDto[]>;
    trySaveTask: (task: TaskDto, userId: number) => Promise<void>;
}

export class TaskRepository implements ITaskRepository {
    async getAllTasks(): Promise<TaskDto[]> {
        return await db('task')
            .select<TaskDto[]>(taskSelector)
            .innerJoin('user', 'user.id', 'task.responsibleUserId')
            .then((rows) => rows.map(mapAsTask) as unknown as TaskDto[]);
    }
    async trySaveTask(task: TaskDto, userId: number): Promise<void> {
        if (task.id < 0) {
            throw new TaskSaveError(
                'идентификатор задачи должен быть неотрицательным'
            );
        }

        if (!task.deadlineTimestamp) {
            throw new TaskSaveError('задача должна иметь срок завершения');
        }

        if (!task.title) {
            throw new TaskSaveError('заголовок обязателен для задачи');
        }

        if (task.title.length > 64) {
            throw new TaskSaveError(
                'заголовок должен быть не больше 64 символов в длину'
            );
        }

        if (task.description?.length > 1024) {
            throw new TaskSaveError(
                'описание должно быть не больше 1024 символов в длину'
            );
        }

        if (!task.priority) {
            throw new TaskSaveError('приоритет обязателен');
        }

        if (isBadPriorityValue(task)) {
            throw new TaskSaveError(
                'значение приоритета должно быть low, medium или high'
            );
        }

        if (!task.status) {
            throw new TaskSaveError('статус обязателен');
        }

        if (isBadStatusValue(task)) {
            throw new TaskSaveError(
                'значение статуса должно быть todo, inprogress, done или cancelled'
            );
        }

        if (!task.responsibleUserId) {
            throw new TaskSaveError('ответственный обязателен');
        }

        if (task.responsibleUserId < 0) {
            throw new TaskSaveError(
                'идентификатор ответственного - неотрицательное целое число'
            );
        }

        const responsibilites =
            await new UserRepository().getResponsibleUserByDirectorId(userId);

        if (didDirectorPickNotHisResponsibilities(responsibilites, task)) {
            throw new TaskSaveError(
                'нельзя указать ответственного не в подчинении'
            );
        }

        task.creationTimestamp = Date.now();
        task.updateTimestamp = task.creationTimestamp;

        try {
            if (isTaskNew(task) && isDirector(responsibilites)) {
                return await saveNewTask(task, userId);
            }

            if (!isDirector(responsibilites)) {
                return db('task').where('id', '=', task.id).update({
                    status: task.status,
                    updateTimestamp: Date.now(),
                });
            }

            await db('task').where('id', '=', task.id).update({
                title: task.title,
                description: task.description,

                deadlineTimestamp: task.deadlineTimestamp,
                creationTimestamp: task.creationTimestamp,
                updateTimestamp: Date.now(),

                priority: task.priority,
                status: task.status,

                responsibleUserId: task.responsibleUserId,
            });
        } catch (error) {
            throw new TaskSaveError(error.message);
        }
    }
}

export class StubTaskRepository implements ITaskRepository {
    async getAllTasks(): Promise<TaskDto[]> {
        return MOCK_TASKS;
    }

    trySaveTask(_task: TaskDto, _userId: number): Promise<void> {
        return Promise.resolve();
    }
}

function didDirectorPickNotHisResponsibilities(
    responsibilites: SessionUser[],
    task: TaskDto
) {
    return responsibilites.length > 0 && !hasResponsible(responsibilites, task);
}

function isDirector(responsibilites: SessionUser[]) {
    return responsibilites.length > 0;
}

async function saveNewTask(task: TaskDto, creatorId: number) {
    await db('task').insert({
        title: task.title,
        description: task.description,

        deadlineTimestamp: task.deadlineTimestamp,
        creationTimestamp: task.creationTimestamp,
        updateTimestamp: task.updateTimestamp,

        priority: task.priority,
        status: task.status,

        creatorId,
        responsibleUserId: task.responsibleUserId,
    });
}

function isTaskNew(task: TaskDto) {
    return task.id === 0;
}

function isBadStatusValue(task: TaskDto) {
    return !['todo', 'inprogress', 'done', 'cancelled'].includes(task.status);
}

function isBadPriorityValue(task: TaskDto) {
    return !['low', 'medium', 'high'].includes(task.priority);
}

function hasResponsible(responsibilites: SessionUser[], task: TaskDto) {
    return responsibilites.some(
        (responsible) => responsible.id === task.responsibleUserId
    );
}

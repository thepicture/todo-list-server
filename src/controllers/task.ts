import express from 'express';

import { TaskRepository } from 'models/Task';

import { TaskService } from 'services/TaskService';

const taskService = new TaskService(new TaskRepository());

export class TaskController {
    async get(req: express.Request, res: express.Response) {
        const tasks = await taskService.getTasks();
        return res.json(tasks);
    }
}

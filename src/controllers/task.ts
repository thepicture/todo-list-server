import express from 'express';
import jwt from 'jsonwebtoken';
import { constants } from 'node:http2';

import { TaskRepository, TaskSaveError } from 'models/Task';

import { TaskService } from 'services/TaskService';

const taskService = new TaskService(new TaskRepository());

export class TaskController {
    async get(_req: express.Request, res: express.Response) {
        const tasks = await taskService.getTasks();
        return res.json(tasks);
    }

    async post(req: express.Request, res: express.Response) {
        const body = req.body;

        const payloadWithUserId = jwt.decode(req.cookies.token) as unknown as {
            id: number;
        };

        try {
            await taskService.trySaveTask(body, payloadWithUserId.id);
        } catch (error) {
            if (error instanceof TaskSaveError) {
                return res.status(400).end(error.message);
            } else {
                console.error(error);
            }
        }

        return res.sendStatus(constants.HTTP_STATUS_NO_CONTENT);
    }
}

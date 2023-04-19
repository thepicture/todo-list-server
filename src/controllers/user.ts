import express from 'express';
import jwt from 'jsonwebtoken';

import { UserRepository } from 'models/User';

import { UserService } from 'services/UserService';

const userService = new UserService(new UserRepository());

export class UserController {
    async get(req: express.Request, res: express.Response) {
        const payload = jwt.decode(req.cookies.token) as unknown as {
            id: number;
        };

        const tasks = await userService.getResponsibleUserByDirectorId(
            payload.id
        );
        return res.json(tasks);
    }
}

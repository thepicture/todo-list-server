import express from 'express';
import jwt from 'jsonwebtoken';
import { constants } from 'node:http2';

import { StubUserRepository } from 'models/User';

import { EXPIRES_IN_24_HOURS, JWT_SECRET_KEY } from '../config/jwt';
import { AuthService } from '../services/AuthService';

export class AuthController {
    async post(req: express.Request, res: express.Response) {
        const authService = new AuthService(new StubUserRepository());

        let user = null;
        try {
            user = await authService.tryGetUserByLoginAndPassword(
                req.body.login,
                req.body.password
            );
        } catch (error) {
            return res
                .status(constants.HTTP_STATUS_UNAUTHORIZED)
                .end(error.message);
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
            expiresIn: '1d',
        });

        res.cookie('token', token, {
            maxAge: EXPIRES_IN_24_HOURS,
            httpOnly: true,
        });

        res.sendStatus(constants.HTTP_STATUS_OK);
    }
}

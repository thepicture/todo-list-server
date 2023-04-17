import * as express from 'express';
import jwt from 'jsonwebtoken';
import { constants } from 'node:http2';

import { JWT_SECRET_KEY } from '../config/jwt';

const UNAUTHORIZED_ROUTES = ['/api/auth'];

const canVisitRoute = (req: express.Request) =>
    UNAUTHORIZED_ROUTES.some((route) => {
        return req.originalUrl.startsWith(route);
    });

export const authMiddleware =
    () =>
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (canVisitRoute(req)) {
            return next();
        }

        try {
            jwt.verify(req.cookies.token, JWT_SECRET_KEY);
            next();
        } catch {
            res.sendStatus(constants.HTTP_STATUS_UNAUTHORIZED);
        }
    };

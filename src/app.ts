import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { json, urlencoded } from 'express';

import { authMiddleware } from './middleware/auth';
import configureRoutes from './routes';

const app = express();

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cookieParser());
app.use(authMiddleware());
app.use(cors());

configureRoutes(app);

export { app };

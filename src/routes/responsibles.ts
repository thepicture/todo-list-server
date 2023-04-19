import express from 'express';

import { UserController } from 'controllers/user';

const router = express.Router();

const userController = new UserController();

router.get('/api/responsibles', userController.get.bind(userController));

export default router;

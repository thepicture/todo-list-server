import express from 'express';

import { TaskController } from 'controllers/task';

const router = express.Router();

const taskController = new TaskController();

router.get('/api/tasks', taskController.get.bind(taskController));
router.post('/api/tasks', taskController.post.bind(taskController));

export default router;

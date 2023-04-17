import express from 'express';

import { AuthController } from '../controllers/auth';

const router = express.Router();

const authController = new AuthController();

router.post('/api/auth', authController.post.bind(authController));

export default router;

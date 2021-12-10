import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = new (Router as any)();

router.post('', userController.createUser);

export default router;
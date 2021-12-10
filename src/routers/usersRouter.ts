import { Router } from 'express';
import * as usersController from '../controllers/usersController';

const router = new (Router as any)();

router.post('', usersController.createUser);

export default router;

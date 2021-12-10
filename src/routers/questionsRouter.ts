import { Router } from 'express';
import * as questionsController from '../controllers/questionsController';

const router = new (Router as any)();

router.post('', questionsController.postQuestion);

export default router;

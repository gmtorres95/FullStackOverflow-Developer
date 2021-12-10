import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import * as questionsController from '../controllers/questionsController';

const router = new (Router as any)();

router.use(validateToken);
router.post('', questionsController.postQuestion);
router.get('', questionsController.getQuestions);

export default router;

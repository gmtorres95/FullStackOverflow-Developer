import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import * as questionsController from '../controllers/questionsController';

const router = new (Router as any)();

router.use(validateToken);
router.post('', questionsController.postQuestion);
router.get('', questionsController.getQuestions);
router.post('/:id', questionsController.postAnswer);
router.get('/:id', questionsController.getQuestion);
router.post('/:id/up-vote', questionsController.vote);
router.post('/:id/down-vote', questionsController.vote);

export default router;

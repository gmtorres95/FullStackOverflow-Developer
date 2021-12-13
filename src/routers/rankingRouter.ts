import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import * as rankingController from '../controllers/rankingController';

const router = new (Router as any)();

router.use(validateToken);
router.get('', rankingController.listRanking);

export default router;

import { Router } from 'express';
import loremController from '../controllers/loremController';
import mainController from '../controllers/mainController';

const router = Router();

router.get('/lorem/:num', loremController.getLorem);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);

export default router;

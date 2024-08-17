import { Router } from 'express';
import loremController from '../controllers/loremController';

const router = Router();

router.get('/lorem/:num', loremController.getLorem);

export default router;

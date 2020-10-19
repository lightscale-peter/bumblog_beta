import {Router} from 'express';
import board from './board';
import auth from './auth';

const router = Router();
router.use('/board', board);
router.use('/auth', auth);

export default router;
import {Router} from 'express';
import {createList, findList, updateList, deleteList} from './board.controller';

const router = Router();

// CRUD
router.post('/list', createList);
router.get('/list', findList);
router.put('/list', updateList);
router.delete('/list', deleteList);

export default router;

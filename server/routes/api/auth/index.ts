import {Router} from 'express';
import {createUser, findUser, updateUser, deleteUser, login} from './auth.controller';

const router = Router();

router.post('/user', createUser);
router.get('/user', findUser);
router.put('/user', updateUser);
router.delete('/user', deleteUser);

router.post('/login', login);

export default router;
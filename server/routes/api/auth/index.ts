import {Router} from 'express';
import {createUser, findUser, updateUser, deleteUser, login, logout, check} from './auth.controller';

const router = Router();

router.post('/user', createUser);
router.get('/user', findUser);
router.put('/user', updateUser);
router.delete('/user', deleteUser);

router.post('/login', login);
router.get('/check', check);
router.delete('/login', logout);

export default router;
import {Router} from 'express';
import {createUser} from './auth.controller';

const router = Router();

router.post('/user', createUser);
// router.get('/user', findUser);
// router.put('/user', updateUser);
// router.delete('/user', deleteUser);

// createUset: (data:userType) => void;
// findOneUser: () => void;
// verifiyPassword: () => void;
// assignAdmin: () => void;

export default router;
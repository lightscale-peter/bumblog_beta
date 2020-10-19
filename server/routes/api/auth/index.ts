// const router = require('express').Router();
// const controller = require('./auth.controller');

import {Router} from 'express';
import controller from './auth.controller';

const router = Router();
// router.post('/register', controller.register);

export default router;

// module.exports = router;
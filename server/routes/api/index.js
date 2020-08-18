const router = require('express').Router();
const board = require('./board');
const auth = require('./auth');

router.use('/auth', auth);
router.use('/board', board);

module.exports = router;
const router = require('express').Router();
const controller = require('./board.controller');

// CRUD
router.post('/list', controller.createList);
router.get('/findAllList', controller.findAllList);
router.get('/findOneList', controller.findOneList);
router.put('/list', controller.updateList);
router.delete('/list', controller.deleteList);

module.exports = router;
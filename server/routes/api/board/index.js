const router = require('express').Router();
const controller = require('./board.controller');

// CRUD
router.post('/list', controller.createList);
router.get('/list', controller.findList);
router.put('/list', controller.updateList);
router.delete('/list', controller.deleteList);

module.exports = router;


//npm install @types/ckeditor__ckeditor5-build-classic  @types/ckeditor__ckeditor5-react
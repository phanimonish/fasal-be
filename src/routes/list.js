const listControllers = require('../controllers/list');

const listRouter = require('express').Router();

listRouter.post('/', listControllers.create);
listRouter.post('/:listId', listControllers.addMoviesToList);
listRouter.get('/', listControllers.get);
listRouter.get('/:listId', listControllers.getById);

module.exports = listRouter;
const express = require('express');

const TodoController = require('./controllers/TodoController');
const UserController = require('./controllers/UserController');
const sessionCheck = require('./middleware');

const routes = express.Router();

routes.post('/login', UserController.login);

routes.get('/todos', [sessionCheck], TodoController.index);
routes.post('/todos', sessionCheck, TodoController.create);
routes.put('/todos/:id/toggle', sessionCheck, TodoController.toggle);
routes.delete('/todos/:id', sessionCheck, TodoController.delete);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.get('/user/:id', sessionCheck, UserController.get);
routes.get('/me', sessionCheck, UserController.getMe);
routes.put('/users/:id', sessionCheck, UserController.update);
routes.delete('/users/:id', sessionCheck, UserController.delete);

module.exports = routes;

const express = require('express');

const routes = express.Router();

const LinkController = require('./src/controllers/LinkController')

routes.get('/', LinkController.index);
routes.get('/:code', LinkController.goTo);
routes.post('/generate', LinkController.generate);

module.exports = routes;
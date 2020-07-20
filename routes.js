const express = require('express');

const routes = express.Router();

routes.get('/teste', function(request, response){
    response.redirect('http://google.com/');
});

module.exports = routes;
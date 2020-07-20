const express = require('express');
const cors = require('cors');
const app = express();
const nunjucks = require('nunjucks');

const routes = require('./routes');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', '.njk');

app.use('/public', express.static(`${__dirname}/public`));

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen('3333');
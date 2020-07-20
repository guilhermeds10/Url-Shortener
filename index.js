const express = require('express');
const cors = require('cors');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

const routes = require('./routes');

nunjucks.configure(__dirname + '/views');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', '.njk');

app.use('/public', express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen('3333');
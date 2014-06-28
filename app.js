var express = require('express'),
    logger = require('morgan'),
    request = require('request'),
    config = require('./config');

var app = express();

app.use(logger());

app.config = config();
app.redisClient = require('./server/redisClient')(app);

app.constants = {
  locationsEndPoint: 'http://5.56.56.139:16080/functions/get_all_estaciones.php'
};

module.exports = app;

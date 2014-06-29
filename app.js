var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    request = require('request'),
    mongoose = require('mongoose'),
    config = require('./config');

var serverPath = function(route){
  return path.join(__dirname, 'server', route);
}

var app = express();

app.serverPath = serverPath;
app.use(logger());

app.config = config();

app.redisClient = require( serverPath( 'redisClient' ))(app);
app.bicimadFetcher = require( serverPath( 'bicimadFetcher' ))(app);
app.models = require( serverPath( path.join('models', 'index') ) );

app.modules = {};
app.modules.mongoose = mongoose;

module.exports = app;

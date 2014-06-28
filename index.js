var express = require('express'),
    request = require('request'),
    config = require('./config');


var app = express();

app.config = config();
app.redisClient = require('./redisClient')(app);


// Only API endpoint for now
app.get('/', function(req, res){

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  app.redisClient.get('bicimad-latest', function(err, body){
    console.log(body);
    if (body === null){
      return request.get('http://5.56.56.139:16080/functions/get_all_estaciones.php', function(err, httpResponse, body){
        app.redisClient.set('bicimad-latest', body, 'NX', 'EX', 120);
        res.send(body);
      });
    }
    res.send(body);

  });
});

var server = app.listen(app.config.port, function() {
    console.log('Listening on port %d', server.address().port);
});

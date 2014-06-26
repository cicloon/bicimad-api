var express = require('express'),
    request = require('request'),
    redis = require('redis'),
    config = require('./config')();


var app = express();

// Redis connection setup
var redisClient;
if (process.env.NODE_ENV == 'production') {
  redisClient = redis.createClient(config.redis.port, config.redis.host, {no_ready_check: true})
  redisClient.auth(config.redis.pwd, function(){
    console.log('redis OK');
  })
}
else { redisClient = redis.createClient(config.redis.port, config.redis.host) }


redisClient.on("error", function (err) {
    console.log("RedisError: " + err);
});

// Only API endpoint for now
app.get('/', function(req, res){

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  redisClient.exists('bicimad-latest', function(err, exists){
    if (exists == true){
      redisClient.get('bicimad-latest', function(err, body){
        res.send(body);
      });
    } else {
      request.get('http://5.56.56.139:16080/functions/get_all_estaciones.php', function(err, httpResponse, body){
        redisClient.set('bicimad-latest', body, 'NX', 'EX', 120);
        res.send(body);
      });
    }
  });
});


var server = app.listen(config.port, function() {
    console.log('Listening on port %d', server.address().port);
});

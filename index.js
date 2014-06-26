var express = require('express'),
    request = require('request'),
    redis = require('redis');


var app = express(),
    redisClient = redis.createClient();;


redisClient.on("error", function (err) {
    console.log("RedisError: " + err);
});


app.get('/', function(req, res){

  redisClient.exists('bicimad-latest', function(err, exists){

    console.log(exists);
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


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

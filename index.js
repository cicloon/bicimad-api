var app = require('./app');

var request = require('request');

// Only API endpoint for now
app.get('/', function(req, res){

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Content-Type", "application/json");
  
  app.redisClient.get('bicimad-latest', function(err, body){
    if (body === null){
      return request.get(app.constants.locationsEndPoint, function(err, httpResponse, body){
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

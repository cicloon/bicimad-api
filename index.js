var app = require('./app');

// Only API endpoint for now
app.get('/', function(req, res){

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Content-Type", "application/json");

  app.bicimadFetcher.fetch('locations', function(body){
    res.send(body);
  });

});

var apiV1 = require( app.serverPath('api_v1') )(app);

var server = app.listen(app.config.port, function() {
  app.modules.mongoose.connect(app.config.mongodb.url);
  console.log('Listening on port %d', server.address().port);
});

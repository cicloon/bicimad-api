module.exports = function(app){

  app.get('/api-v1*', function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Request-Method", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Content-Type", "application/json");
    next();
  });

  app.get('/api-v1/locations', function(req, res){
    app.models.BicimadPoint.all(function(err, results){
      if (err) { handleError(res); }
      else{
        res.send({locations: results});
      }
    });

  });

  app.get('/api-v1/locations/nearest*', function(req, res, next){
    if (req.query.lat !== undefined && req.query.long !== undefined) {
      next();
    }
    else {
      res.statusCode = 400;
      res.send( {error: 'Missing coordinates'}  )
    }
  });

  app.get('/api-v1/locations/nearest', function(req, res){

    var long = parseFloat(req.query.long, 10),
        lat  = parseFloat(req.query.lat, 10);

    var distance = (req.query.distance === undefined)? 100 : parseInt(req.query.distance);

    app.models.BicimadPoint.nearest(long, lat, distance, function(err, results) {
      if (err){
        handleError(res);
      } else {
        res.send({locations: results});
      }
    });
  });

  var handleError = function(res){
    res.statusCode = 500;
    res.send({ error: 'Server error'})
  }

}

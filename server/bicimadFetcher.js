var request = require('request');

module.exports = function(app){

  var BicimadFetcher = function(app){
    this.redisClient = app.redisClient;

    this.endPoints = {
      'locations': 'http://5.56.56.139:16080/functions/get_all_estaciones.php'
    };
  };

  BicimadFetcher.prototype.fetch = function(fetching, cb){

    this.redisClient.get(fetching, function(err, body){
      if (body === null){
        console.log(this.endPoints);
        return request.get(this.endPoints[fetching], function(err, httpResponse, body){
          this.redisClient.set(fetching, body, 'NX', 'EX', 900);
          cb(body);
        }.bind(this));
      }
      cb(body);
    }.bind(this))
  };

  return new BicimadFetcher(app);
}

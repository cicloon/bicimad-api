var app = require('../app');
    BicimadPoint = app.models.BicimadPoint,
    mongoose = app.modules.mongoose,
    async = app.modules.async;

mongoose.connect(app.config.mongodb.url);

module.exports = function(grunt){

  grunt.registerTask('updateLocationsDB', function() {
    var done = this.async();

    var updateOrCreateLocation = function (locationJson, cb){
      BicimadPoint.findOne({ idestacion: locationJson.idestacion }, function(err, bicimadPoint){

        locationJson.coords = [ locationJson.longitud, locationJson.latitud ];

        if (bicimadPoint !== null){

          console.log('updating location: ' + locationJson.idestacion);
          BicimadPoint.update({_id: bicimadPoint.id}, locationJson, {upsert: true}, function(err){
            if (err) console.log('unable to update location');
            cb();
          });

        } else {

          console.log('saving new location: ' + locationJson.idestacion);
          bicimadPoint = new BicimadPoint(locationJson);
          bicimadPoint.save(function(err){
            if (err) console.log('unable to save location');
            cb();
          });

        }
      })
    };

    var process = function(){
      app.bicimadFetcher.fetch('locations', function(locations){
        var locationsJson = JSON.parse(locations);
        async.each(locationsJson.estaciones, updateOrCreateLocation, done);
      });
    };

    process();

  });
}

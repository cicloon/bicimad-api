module.exports = function(app){

  var _ = app.modules._;
  var mongoose = app.modules.mongoose;

  var Schema = mongoose.Schema;

  var bicimadPointSchema = new Schema({
    idestacion:  String,
    nombre: String,
    numero_estacion: String,
    direccion: String,
    coords: [Number],
    latitud: String,
    longitud: String,
    activo: Boolean,
    luz: Boolean,
    numbero_bases: Number,
    libres: Number,
    porcentaje: Number,
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now }
  });

  bicimadPointSchema.index({ coords: '2dsphere' });
  bicimadPointSchema.index({idestacion: 1});

  // bicimadPointSchema.set('autoIndex', false);

  bicimadPointSchema.statics.all = function(cb){
    app.models.BicimadPoint.find().exec(function(err, results){
      var formattedResults = _.map(results, function(res){
        var formattedResult = BicimadPoint.apiFormat(res);
        return formattedResult;
      });
      if (err) console.log(err);
      cb(err, formattedResults);
    })
  };

  bicimadPointSchema.statics.nearest = function(long, lat, distance, cb){
    var point = { type : "Point", coordinates : [long, lat] };

    this.geoNear(point, { maxDistance: distance / 6378137, distanceMultiplier: 6378137 , spherical : true }, function(err, results, stats) {
      console.log(results);

      var formattedResults = _.map(results, function(res){
        var formattedResult = BicimadPoint.apiFormat(res.obj);
        formattedResult.dis = res.dis;
        return formattedResult;
      });

      if (err) console.log(err);
      cb(err, formattedResults);
    });
  };

  bicimadPointSchema.statics.apiFormat = function(bicimadPoint){
    return _.pick(bicimadPoint,
      'idestacion', 'nombre', 'numero_estacion', 'direccion', 'latitud',
      'longitud', 'activo', 'luz', 'libres', 'porcentaje'
    );
  }

  var BicimadPoint = mongoose.model('BicimadPoint', bicimadPointSchema);

  return BicimadPoint;

}

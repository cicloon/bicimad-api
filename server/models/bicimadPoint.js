module.exports = function(app){

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

  bicimadPointSchema.index({ coords: '2d' });
  bicimadPointSchema.index({idestacion: 1});

  // bicimadPointSchema.set('autoIndex', false);

  var BicimadPoint = mongoose.model('BicimadPoint', bicimadPointSchema);

  return BicimadPoint;

}

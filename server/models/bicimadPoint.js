module.exports = function(app){

  var mongoose = app.modules.mongoose;

  var Schema = mongoose.Schema;

  var bicimadPointSchema = new Schema({
    idestacion:  String,
    nombre: String,
    numero_estacion: String,
    direccion: String,
    coords: [Number],
    activo: Boolean,
    luz: Boolean,
    numbero_bases: Number,
    libres: Number,
    porcentaje: Number,
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now }
  });

}

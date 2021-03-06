const { Schema, model } = require('mongoose')

const medicoSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  img: {
    type: String,
  },
  usuario: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  hospitals: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Hospital'
  }
});
// },{collention: medicos}); para poner en especifico la coleccion en mongoDB


/* Cambiar el _id creado por mongo automaticamente */
// usuarioSchema.method('toJSON', function() {
//   const {_v, _id, ...object} = this.toObject();
//   object.uid = _id; //para cambiar de nombre el _id
//   return object;
// })
medicoSchema.method('toJSON', function() {
  const {__v, ...object} = this.toObject();
  return object;
})


module.exports = model('Medico', medicoSchema)
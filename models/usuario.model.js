const { Schema, model } = require('mongoose')

const usuarioSchema = Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE'
  },
  google: {
    type: Boolean,
    default: false
  }
})


/* Cambiar el _id creado por mongo automaticamente */
// usuarioSchema.method('toJSON', function() {
//   const {_v, _id, ...object} = this.toObject();
//   object.uid = _id; //para cambiar de nombre el _id
//   return object;
// })
usuarioSchema.method('toJSON', function() {
  const {password, ...object} = this.toObject();
  return object;
})


module.exports = model('Usuario', usuarioSchema)
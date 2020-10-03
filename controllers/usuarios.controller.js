const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');

const routesUsuarios = {
  getUsuarios : async(req, res) => {
    const usuario = await Usuario.find()
    res.json({
      ok: 'hola',
      usuario
    })
  },

  crearUsuario : async(req, res = response) => {

    const { email, password } = req.body;

    
    try {
      const existeEmail = await Usuario.findOne({email});
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'El correo ya esta registrado'
        })
      }
      const usuario = new Usuario( req.body );
      //encriptar contraseña
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);

      //Guardar el usuario
      await usuario.save();

      const token = await generarJWT(usuario.id);
      res.json({
        ok: true,
        usuario,
        token
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error inesperado.. revisar logs'
      })
    }

    
  },

  actualizarUsuario: async(req, res = response) => {
    //TODO: Validae token y comprobar si es el usuario correcto
    const uid = req.params.id;
    try {

      const usuarioDB = await Usuario.findById(uid);
      if(!usuarioDB){
        return res.status(400).json({
          ok: false,
          msg: 'No esxte un usuario por ese id'
        });
      }

      // Actualizacion
      const {password, email, google, ...campos} = req.body;
      if(usuarioDB.email !== email){
        const existeEmail = await Usuario.find({email: email});
        console.log(existeEmail);
        if(existeEmail){
          return res.status(400).json({
            ok: false,
            msg: 'Ya existe un usuario con ese Email'
          })
        }
      }
      campos.email = email;
      const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

      res.json({
        ok: true,
        usuario: usuarioActualizado
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({
        ok: false,
        msg: 'Error Inesperado'
      })
    }
  },
  borrarUsuario: async(req, res = response) => {
    const uid = req.params.id;
    try {
      const usuarioDB = await Usuario.findById(uid);
      if (!usuarioDB) {
        return res.status(404).json({
          ok: false,
          msg: 'No existe un usuario por ese ID'
        })
      }

      await Usuario.findByIdAndDelete(uid);

      res.json({
        ok: true,
        msg: 'El ID ha sido eliminado'
      })
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Hable con el Administrador'
      })
    }
    // const elimino = Usuario.findByIdAndDelete(uid)
  }


}


module.exports = routesUsuarios;
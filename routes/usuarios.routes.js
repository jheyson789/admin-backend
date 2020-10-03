/*
  Ruta: /api/usuarios/
*/
const { Router } = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos-middleware');

const Usuarios = require('../controllers/usuarios.controller');
const { validarJWT } = require('../middlewares/validar-jwt.middleware');

const router = Router();

router.get('/', validarJWT, Usuarios.getUsuarios);
router.post('/', [ 
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'La contraseña es obligatoria').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  validarCampos
 ], Usuarios.crearUsuario);
 router.put('/:id', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  check('role', 'El rol es obligatorio').not().isEmpty(),
  validarCampos
 ], Usuarios.actualizarUsuario);
 router.delete('/:id', validarJWT, Usuarios.borrarUsuario)
 
module.exports = router;
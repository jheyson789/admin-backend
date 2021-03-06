/*
  Ruta: /api/medicos/
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos-middleware');
const { validarJWT } = require('../middlewares/validar-jwt.middleware');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos.controller');


const router = Router();

router.get('/', getMedicos);

router.post('/', [ 
  validarJWT,
  check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
  check('hospitals', 'El hospital ID debe ser valido').isMongoId(),
  validarCampos
 ], crearMedico);

 router.put('/:id', [
  
 ], actualizarMedico );

 router.delete('/:id', borrarMedico)
 
module.exports = router;

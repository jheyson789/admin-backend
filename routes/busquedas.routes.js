/* ruta: api/todo/:busquedas */


const { Router } = require('express');
const { check } = require('express-validator');

const { getBusqueda, getDocumentosColeccion } = require('../controllers/busquedas.controller');

const { validarCampos } = require('../middlewares/validar-campos-middleware');
const { validarJWT } = require('../middlewares/validar-jwt.middleware');

const router = Router();

router.get('/:busqueda', validarJWT, getBusqueda);

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion);

module.exports = router;
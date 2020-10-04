//getTodo

const {response} = require('express');
const Hospital = require('../models/hospital.model');
const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');

const BusquedaRoute = {
  getBusqueda : async(req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, hospitales, medicos] = await Promise.all([
      Usuario.find({nombre: regex}),
      Hospital.find({nombre: regex}),
      Medico.find({nombre: regex})

    ])



    res.status(200).json({
      ok: true,
      msg: "Buscando...",
      usuarios,
      hospitales,
      medicos
    })
  },

  getDocumentosColeccion : async(req, res = response) => {
    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');
    let data = [];

    switch (tabla) {
      case 'medicos':
        data = await Medico.find({nombre: regex});
        
        break;
      case 'hospitales':
        data = await Hospital.find({nombre: regex});
        
        break;
      case 'usuarios':
        data = await Usuario.find({nombre: regex});
        break;
    
      default:
        return res.status(400).json({
          ok: false,
          msg: "La tabla tiene que ser usuarios/medicos/hospitales"
        })
      
    }
    res.status(200).json({
      ok: true,
      resultado: data
    })
  }
}

module.exports = BusquedaRoute;
const { response } = require('express');

const Hospital = require('../models/hospital.model');

const HospitalesRoutes = {
  
  getHospitales : async (req, res = response) => {
    const hospitales = await Hospital.find().populate('usuario','nombre email img')
    res.json({
      ok: true,
      hospitales
    })
  },
  
  crearHospital : async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({usuario:uid, ...req.body});

    
    try {
      const hospitalDB = await hospital.save();
      res.json({
        ok: true,
        hospital: hospitalDB
      })
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
      })
    }


   
  },
  
  actualizarHospital : (req, res = response) => {
    res.json({
      ok: true,
      msg: 'crear Hospital'
    })
  },
  
  borrarHospital : (req, res = response) => {
    res.json({
      ok: true,
      msg: 'crear Hospital'
    })
  }

} //master



module.exports = HospitalesRoutes;
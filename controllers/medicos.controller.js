const { response } = require('express');

const Medico = require('../models/medico.model');

const MedicosRoutes = {
  
  getMedicos : async (req, res = response) => {

    const medicos = await Medico.find()
                                .populate('usuario', 'nombre')
                                .populate('hospitals', 'nombre')

    
    res.json({
      ok: true,
      medicos
    })
  },
  
  crearMedico : async (req, res = response) => {

    const uid = req.uid;
    const medico = new Medico({
      usuario: uid,
      ...req.body
    })
    
    try {
      const medicoDB = await medico.save();
      res.json({
        ok: true,
        medico: medicoDB
      })
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Hable con el administrador"
      })
    }
    
  },
  
  actualizarMedico : (req, res = response) => {
    res.json({
      ok: true,
      msg: 'crear Medico'
    })
  },
  
  borrarMedico : (req, res = response) => {
    res.json({
      ok: true,
      msg: 'crear Medico'
    })
  }

} //master



module.exports = MedicosRoutes;
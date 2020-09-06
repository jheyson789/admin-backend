require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configurar  CORS
app.use(cors());

// Base de datos
dbConnection();

// Rutas

app.get('/', (req, res) => {
  res.json({
    ok: true,
    msf: 'hola mundo'
  })
})

app.listen(process.env.PORT, () => {
  console.log('servidor corriendo en el puerto '+ process.env.PORT);
})
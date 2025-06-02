const express = require('express');
require('dotenv').config();
const pool = require('./config/conexion_db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const indexRoutes = require('./routes/index');

app.use(express.json());
app.set('views', path.join(__dirname, 'template'));
app.use('/', indexRoutes);


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

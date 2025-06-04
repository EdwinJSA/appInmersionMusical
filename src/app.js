// app.js
const express = require('express');
require('dotenv').config();
require('./config/conexion_db');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/login');
const docenteRoutes = require('./routes/docente');
const estudianteRoutes = require('./routes/estudiante');
const adminRoutes = require('./routes/admin');

app.use(express.json());
app.set('views', path.join(__dirname, 'template'));
app.use(express.static(path.join(__dirname, '../public')));
//app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoutes);
app.use('/', loginRoutes);
app.use('/docente', docenteRoutes);
app.use('/estudiante', estudianteRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

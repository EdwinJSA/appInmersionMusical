// src/routes/correo.js
const express = require('express');
const router = express.Router();

router.get('/:username', (req, res) => {
    // correo recuperado para ver mensajes del usuario
  const username = req.params.username;
  console.log(`Correo de ${username}`);

  // Datos ficticios
  const emails = [
    {
      id: 1,
      asunto: 'Reunión importante',
      idOrigen: { id: 10, username: 'profesor1' },
      fecha: '2025-06-04',
    },
    {
      id: 2,
      asunto: 'Tarea entregada',
      idOrigen: { id: 20, username: 'estudiante1' },
      fecha: '2025-06-03',
    },
  ];

  const origen = 10; // id del usuario que envía el correo (ejemplo)
  const userType = 'profesor'; // o 'estudiante'

  const destino = [
    { idUsuario: 101, nombre: 'Alumno Juan' },
    { idUsuario: 102, nombre: 'Alumno María' },
  ];
  
  res.render('correo', {
    emails,
    origen,
    destino,
    session: {
      username: req.session.username,       // o el dato correcto que tengas
      userType: req.session.tipoUsuario,       // usa el mismo campo que usas en otras vistas
      userbool: true                        // si quieres agregar esta bandera como en docente
    }
  });

});

module.exports = router;

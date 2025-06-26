// src/routes/correo.js
const express = require('express');
const multer = require('multer');
const router = express.Router();
const consultaDocente = require('../controllers/consultaDocente');

const storageCorreo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, correoDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fechaHora = new Date().toISOString().replace(/[-:.TZ]/g, '');
    const nombreFinal = `CORREO_${fechaHora}${ext}`;
    cb(null, nombreFinal);
  }
});

const uploadCorreo = multer({ storage: storageCorreo });


router.post('/enviarCorreo', uploadCorreo.single('linkArchivo'), async (req, res) => {
  const { idOrigen, idDestino, asunto, cuerpo } = req.body;

  const archivo_url = req.file ? `/correos/${req.file.filename}` : null;

  await consultaDocente.enviarCorreo(idOrigen, idDestino, asunto, cuerpo, archivo_url);
  return res.redirect(`/`);
});



router.get('/:username', async (req, res) => {
    // correo recuperado para ver mensajes del usuario
  const username = req.params.username;
  const origen = req.session.username; // o el dato correcto que tengas
  const destino = await consultaDocente.alumnosCursoPorDocente(origen);

  // //destinos ficticios
  // const destino = [
  //   { idUsuario: 10, nombre: 'profesor1' },
  //   { idUsuario: 20, nombre: 'estudiante1' },
  //   { idUsuario: 30, nombre: 'estudiante2' },
  //   { idUsuario: 40, nombre: 'estudiante3' },
  // ];

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
  
  res.render('correo', {
    emails,
    origen,
    destino,
    session: {
      username: req.session.username,    
      userType: req.session.tipoUsuario,   
      userbool: true
    }
  });

});

module.exports = router;

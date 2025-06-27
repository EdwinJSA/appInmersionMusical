// src/routes/correo.js
const express = require('express');
const multer = require('multer');
const multer = require('multer');
const router = express.Router();
const consultaDocente = require('../controllers/consultaDocente');
const consultaAdmin = require('../controllers/consultaAdmin');
const path = require("path");
const { table } = require('console');
const correoDir = path.join(__dirname, '../../public/mails');

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

  const archivo_url = req.file ? `/mails/${req.file.filename}` : null;

  await consultaDocente.enviarCorreo(idOrigen, idDestino, asunto, cuerpo, archivo_url);
  return res.redirect(`/docente/mails`);
});



router.get('/:username', async (req, res) => {
    // correo recuperado para ver mensajes del usuario
  const origen = await consultaAdmin.recuperarIdUsuarioPorCorreo(req.params.username);
  
  console.log('----> ', origen); // es un entero
  const destino = await consultaDocente.alumnosCursoPorDocente(origen);
  const emails = await consultaAdmin.obtenerCorreosPorIdUsuario(origen);
  console.table(emails);


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
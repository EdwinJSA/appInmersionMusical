const express = require('express');
const router = express.Router();
const consultaDocente = require('../controllers/consultaDocente');

router.get('/grupos', (req, res) => {
  res.render('grupos', {
    session: {
      username: req.session.username,
      userType: req.session.tipoUsuario
    },
    grupos: [
      { id: 1, nombre: 'Matemáticas' },
      { id: 2, nombre: 'Ciencias' },
      { id: 3, nombre: 'publico' } // para mostrar el condicional
    ],
    csrfToken: 'faketoken12345' // solo para simular
  });
});



router.get('/documentos', (req, res) => {
    res.render('documentos', {
        session: {
            username: req.session.username,
            userType: req.session.tipoUsuario
        },
        historial: [
            { titulo: 'Clase de Matemáticas', fecha: '2025-06-01' },
            { titulo: 'Taller de Ciencias', fecha: '2025-05-20' }
        ],
        grupos: [
            { id: 1, nombre: 'Grupo A' },
            { id: 2, nombre: 'Grupo B' }
        ]
    });
});

module.exports = router;


router.get('/estCurso', async (req, res) => {
    const usuarios = await consultaDocente.alumnosCursoPorDocente(req.session.username);

    console.table(usuarios);

    res.render('estCurso', {
        session: {
            username: req.session.username,
            userType: req.session.tipoUsuario
        },
        usuarios,
        // ESTO TIENE QUE ELIMINARSE LUEGO, PORQUE NO SE GENERA EL FORMULARIO POR MEDIO DE ESTO
        formFields: [
            { id: 'nombre', label: 'Nombre', html: '<input type="text" name="nombre" id="nombre" class="form-control">' },
            { id: 'carnet', label: 'Carnet', html: '<input type="text" name="carnet" id="carnet" class="form-control">' }
        ]
    });
});

router.get('/:correo', (req, res) => {
    const correo = req.params.correo;
    console.log(`Correo del docente: ${correo}`);

    const nombreDocente = "Sergio";
    const cursos = [
        { nombre: 'matematicas', num_estudiantes: 25, background: 'green' },
        { nombre: 'literatura', num_estudiantes: 30, background: 'purple' },
        { nombre: 'publico', num_estudiantes: 100, background: 'gray' }, // será filtrado
    ];

    res.render('docente', {
        nombreDocente,
        cursos,
        session: {
            username: correo,
            userType: req.session.tipoUsuario,
            userbool: true
        },
    });
});

module.exports = router;
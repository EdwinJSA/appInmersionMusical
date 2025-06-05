// src/routes/login.js
const express = require('express');
const router = express.Router();

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

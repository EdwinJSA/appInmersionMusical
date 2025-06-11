// src/routes/login.js
const express = require('express');
const path = require('path');
const consultaEstudiante = require('../controllers/consultaEstudiante');

const router = express.Router();


router.get('/:correo', (req, res) => {
    const correo = req.params.correo;
    console.log(`Correo del estudiante: ${correo}`);

    // Datos ficticios para visualizar el contenido
    const estudiante = {
        nombre: 'Marcelo',
        correo: correo
    };

    const cursos = [
        { nombre: 'Matemáticas', num_estudiantes: 25, background: 'green' },
        { nombre: 'Física', num_estudiantes: 18, background: 'blue' },
        { nombre: 'publico', num_estudiantes: 100, background: 'gray' } // no se mostrará
    ];

    const videos = [
        { link: 'dQw4w9WgXcQ', titulo: 'Video 1', descripcion: 'Introducción al curso' },
        { link: '3JZ_D3ELwOQ', titulo: 'Video 2', descripcion: 'Clase práctica' }
    ];

    const documentos = [
        { link: 'docs/tema1.pdf', titulo: 'Tema 1 - Álgebra' },
        { link: 'docs/tema2.pdf', titulo: 'Tema 2 - Derivadas' }
    ];

    const recomendaciones = [
        { fecha: '2025-06-01', descripcion: 'Repasar los ejercicios antes del examen.' },
        { fecha: '2025-06-02', descripcion: 'No olvides entregar tu proyecto final.' }
    ];

    res.render('estudiante', {
        estudiante,
        cursos,
        videos,
        documentos,
        recomendaciones
    });
});

module.exports = router;

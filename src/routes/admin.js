// src/routes/login.js
const express = require('express');
const path = require('path');
const consultasAdmin = require('../controllers/consultaAdmin');
const funciones = require('../controllers/funciones');

const router = express.Router();

router.post('/registrarEstudiante', async (req, res) => {
    try {
        const {
            nombre,
            numeroEstudiante,
            correo,
            direccion,
            fechaNac,
            nombreTutor,
            celularTutor,
            correoTutor,
            tutor
        } = req.body;

        let correos = [];
        if (correoTutor) correos.push(correoTutor);
        if (correo) correos.push(correo);

        console.table(req.body);

        // Validaciones básicas
        if (!correo || !numeroEstudiante) {
            return res.status(400).json({ error: 'Correo y número de estudiante son requeridos' });
        }

        const edad = funciones.calcularEdad(fechaNac);
        if (isNaN(edad)) {
            return res.status(400).json({ error: 'Fecha de nacimiento inválida' });
        }

        // Crear contraseña y usuario
        const contrasena = funciones.crearContrasena(nombre, numeroEstudiante);
        const idNuevoUsuario = await consultasAdmin.crearNuevoUsuario(correo, contrasena, 'ESTUDIANTE');

        // Crear estudiante con el id obtenido
        await consultasAdmin.crearNuevoEstudiante(
            nombre,
            numeroEstudiante,
            edad,
            direccion,
            fechaNac,
            idNuevoUsuario,
            tutor,
            nombreTutor,
            celularTutor,
            correoTutor
        );
        //                          destinatarios, nombreEstudiante, usuario, contraseña
        await funciones.enviarCorreo(correos, nombre, correo, contrasena);

        console.log(`Estudiante ${nombre} registrado exitosamente con ID: ${idNuevoUsuario}`);

        res.status(201).json({
            message: 'Estudiante registrado exitosamente',
            idUsuario: idNuevoUsuario,
            usuario: correo,
            contrasena: contrasena
        });

    } catch (error) {
        console.error('❌ Error registrando estudiante:', error.message);

        if (error.code === '23505') {
            return res.status(409).json({ error: 'El correo o usuario ya existe' });
        }

        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


router.get('/:correo', (req, res) => {
    const { correo } = req.params.correo;
    console.log(`Correo del administrador: ${correo}`);
    res.render('admin');
});

module.exports = router;
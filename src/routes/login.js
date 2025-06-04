// src/routes/login.js
const express = require('express');
const path = require('path');
const { validarUsuario } = require('../controllers/usuario');
const router = express.Router();

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'template', 'login.html'));
});

router.post('/verificarUsuario', async (req, res) => {
    const { username, password, tipoUsuario } = req.body;
    try {
        const usuario = await validarUsuario(username, password, tipoUsuario);

        if(!usuario) {
            return res.status(401).send('Credenciales inválidas');
        }

        switch (tipoUsuario) {
            case 'ADMINISTRADOR':
                console.log(`Usuario administrador autenticado: ${usuario.username}`);
                res.redirect(`/admin/${usuario.username}`);
                break;
            case 'DOCENTE':
                console.log(`Usuario docente autenticado: ${usuario.username}`);
                res.redirect(`/docente/${usuario.username}`);
                break;
            case 'ESTUDIANTE':
                console.log(`Usuario estudiante autenticado: ${usuario.username}`);
                res.redirect(`/estudiante/${usuario.username}`);
                break;
            default:
                return res.status(400).send('Tipo de usuario no válido');
        }

    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
});


module.exports = router;

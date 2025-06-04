// src/routes/login.js
const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/:correo', (req, res) => {
    const { correo } = req.params.correo;
    console.log(`Correo del docente: ${correo}`);
    res.sendFile(path.join(__dirname, '..', 'template', 'docente.html'));
});

module.exports = router;
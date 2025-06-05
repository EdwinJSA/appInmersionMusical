// src/routes/login.js
const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/:correo', (req, res) => {
    const { correo } = req.params.correo;
    console.log(`Correo del administrador: ${correo}`);
    res.render('admin');
});

module.exports = router;
// src/routes/login.js
const express = require("express");
const path = require("path");
const { validarUsuario } = require("../controllers/usuario");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", { layout: false });
});

router.get("/logout", (req, res) => {
  req.session.username = null;
  req.session.tipoUsuario = null;
  req.session.destroy();
  res.redirect("/");
});

router.post("/verificarUsuario", async (req, res) => {
  const { username, password, tipoUsuario } = req.body;

  try {
    const usuario = await validarUsuario(username, password, tipoUsuario);

    if (!usuario) {
      //supuestamente aqui renderiza el login con el mensaje
      return res.render("login", {
        mensaje: "Credenciales inválidas",
        layout: false,
      });
    }

    // ✅ Asignar propiedades individuales a la sesión (NO sobrescribirla)
    req.session.username = usuario.username;
    req.session.tipoUsuario = usuario.usertype.toLowerCase();

    // Redirección basada en el tipo de usuario
    switch (tipoUsuario) {
      case "ADMINISTRADOR":
        console.log(`Usuario administrador autenticado: ${usuario.username}`);
        return res.redirect(`/admin/${usuario.username}`);
      case "DOCENTE":
        console.log(`Usuario docente autenticado: ${usuario.username}`);
        return res.redirect(`/docente/${usuario.username}`);
      case "ESTUDIANTE":
        console.log(`Usuario estudiante autenticado: ${usuario.username}`);
        return res.redirect(`/estudiante/${usuario.username}`);
      default:
        return res.status(400).send("Tipo de usuario no válido");
    }
  } catch (error) {
    console.error("Error al verificar usuario:", error);
    return res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;

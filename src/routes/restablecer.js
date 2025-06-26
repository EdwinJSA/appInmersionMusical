const express = require("express");
const router = express.Router();
const pool = require("../config/conexion_db");
const crypto = require("crypto");
const enviarCorreoReset = require("../utils/correo");

// Mostrar formulario de restablecimiento
router.get("/restablecer", (req, res) => {
  res.render("restablecer");
});

// Enviar correo de restablecimiento
router.post("/enviar-reset", async (req, res) => {
  const { username } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM usuario WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.render("restablecer", { mensaje: "Correo no registrado." });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const tokenExpira = new Date(Date.now() + 3600000);

    await pool.query(
      "UPDATE usuario SET reset_token = $1, token_expira = $2 WHERE username = $3",
      [token, tokenExpira, username]
    );

    await enviarCorreoReset(username, token);

    res.render("restablecer", {
      mensaje: "Revisa tu correo para restablecer tu contraseña.",
    });
  } catch (err) {
    console.error(err);
    res.render("restablecer", { mensaje: "Error generando token." });
  }
});

// Mostrar formulario para nueva contraseña
router.get("/restablecer/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM usuario WHERE reset_token = $1 AND token_expira > NOW()",
      [token]
    );

    if (result.rows.length === 0) {
      return res.send("Token inválido o expirado");
    }

    res.render("nuevo_password", { token });
  } catch (err) {
    console.error(err);
    res.send("Error verificando el token");
  }
});

// Procesar nueva contraseña (sin bcrypt, guarda en texto plano)
router.post("/restablecer-password", async (req, res) => {
  const { token, password } = req.body;

  try {
    const result = await pool.query(
      "UPDATE usuario SET password = $1, reset_token = NULL, token_expira = NULL WHERE reset_token = $2 AND token_expira > NOW()",
      [password, token]
    );

    if (result.rowCount === 0) {
      return res.send("Token inválido o expirado");
    }
  } catch (err) {
    console.error(err);
    return res.send("Error al actualizar la contraseña");
  }

  res.render("restablecer", {
    mensaje: "Contraseña restablecida correctamente.",
  });
});
module.exports = router;

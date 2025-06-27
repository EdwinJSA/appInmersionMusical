const express = require("express");
const router = express.Router();
const grupoController = require("../controllers/grupo");

// Mostrar grupos y formulario (solo datos de la base de datos)
router.get("/", grupoController.listarGrupos);

// Crear nuevo grupo (solo datos de la base de datos)
router.post("/nuevo", grupoController.crearGrupo);

// Eliminar grupo
router.get("/eliminar/:id", grupoController.eliminarGrupo);

// Editar grupo (nombre)
router.post("/editarGrupo/:id", grupoController.editarGrupo);

module.exports = router;

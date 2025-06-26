const express = require("express");
const router = express.Router();
const consultaEstudiante = require("../controllers/consultaEstudiante");

router.get("/:correo", async (req, res) => {
  const correo = req.params.correo;

  try {
    const estudiante = await consultaEstudiante.obtenerEstudiantePorCorreo(
      correo
    );
    const cursos = await consultaEstudiante.obtenerCursosPorCorreo(correo);
    const videos = await consultaEstudiante.obtenerVideosPorCorreo(correo);
    const documentos = await consultaEstudiante.obtenerDocumentosPorCorreo(
      correo
    );
    const recomendaciones =
      await consultaEstudiante.obtenerRecomendacionesPorCorreo(correo);

    res.render("estudiante", {
      estudiante,
      cursos,
      videos,
      documentos,
      recomendaciones,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener la información del estudiante");
  }
});

module.exports = router;

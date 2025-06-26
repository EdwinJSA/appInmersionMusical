const pool = require("../config/conexion_db");
const { calcularEdad } = require("../controllers/funciones");

// Consulta datos del estudiante
async function obtenerEstudiantePorCorreo(correo) {
  const result = await pool.query(
    `SELECT e.nombre, u.username AS correo
     FROM Estudiante e
     JOIN Usuario u ON e.idUsuario = u.id
     WHERE u.username = $1`,
    [correo]
  );
  return result.rows[0];
}

// Consulta cursos del estudiante
async function obtenerCursosPorCorreo(correo) {
  const result = await pool.query(
    `SELECT c.nombre, c.background,
            (SELECT COUNT(*) FROM CursoEstudiante ce2 WHERE ce2.idCurso = c.id) AS num_estudiantes
     FROM Curso c
     JOIN CursoEstudiante ce ON ce.idCurso = c.id
     JOIN Estudiante e ON ce.idEstudiante = e.id
     JOIN Usuario u ON e.idUsuario = u.id
     WHERE u.username = $1`,
    [correo]
  );
  return result.rows;
}

// Consulta videos del estudiante (por cursos en los que está inscrito)
async function obtenerVideosPorCorreo(correo) {
  const result = await pool.query(
    `SELECT v.link, v.titulo, v.descripcion
     FROM Videos v
     JOIN CursoEstudiante ce ON v.idCurso = ce.idCurso
     JOIN Estudiante e ON ce.idEstudiante = e.id
     JOIN Usuario u ON e.idUsuario = u.id
     WHERE u.username = $1 AND v.visibilidad = TRUE
     ORDER BY v.fecha DESC`,
    [correo]
  );
  return result.rows;
}

// Consulta documentos del estudiante (por cursos en los que está inscrito)
async function obtenerDocumentosPorCorreo(correo) {
  const result = await pool.query(
    `SELECT d.link, d.titulo
     FROM Documentos d
     JOIN CursoEstudiante ce ON d.idCurso = ce.idCurso
     JOIN Estudiante e ON ce.idEstudiante = e.id
     JOIN Usuario u ON e.idUsuario = u.id
     WHERE u.username = $1 AND d.visibilidad = TRUE
     ORDER BY d.fecha DESC`,
    [correo]
  );
  return result.rows;
}

// Consulta recomendaciones del estudiante
async function obtenerRecomendacionesPorCorreo(correo) {
  const result = await pool.query(
    `SELECT r.fecha, r.descripcion
     FROM Recomendaciones r
     JOIN Estudiante e ON r.idEstudiante = e.id
     JOIN Usuario u ON e.idUsuario = u.id
     WHERE u.username = $1
     ORDER BY r.fecha DESC`,
    [correo]
  );
  return result.rows;
}

module.exports = {
  obtenerEstudiantePorCorreo,
  obtenerCursosPorCorreo,
  obtenerVideosPorCorreo,
  obtenerDocumentosPorCorreo,
  obtenerRecomendacionesPorCorreo,
};

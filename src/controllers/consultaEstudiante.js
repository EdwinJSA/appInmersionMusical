const pool = require("../config/conexion_db");
const { calcularEdad } = require("../controllers/funciones");


// Obtiene los datos del estudiante por id
const obtenerDatosEstudiante = async (idEstudiante) => {
  const query = `
        SELECT 
            e.id AS idEstudiante,
            e.nombre,
            u.username AS correo,
            e.numeroEstudiante,
            e.edad,
            e.direccion,
            e.fechaNac,
            e.estado,
            e.fecInsc,
            e.tutor,
            e.nombreTutor,
            e.celularTutor,
            e.correoTutor
        FROM 
            Estudiante e
        JOIN 
            Usuario u ON e.idUsuario = u.id
        WHERE 
            u.username = $1
        LIMIT 1
    `;
  const values = [idEstudiante];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { obtenerDatosEstudiante };

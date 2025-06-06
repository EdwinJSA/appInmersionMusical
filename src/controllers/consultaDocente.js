//src/controllers/usuario.js
const pool = require('../config/conexion_db');

const alumnosCursoPorDocente = async (idDocente) => {
    const query = `
        SELECT
            e.id AS idEstudiante,
            e.nombre AS nombreEstudiante
        FROM 
            CursoEstudiante ce
        JOIN 
            Estudiante e ON ce.idEstudiante = e.id
        JOIN 
            Curso c ON ce.idCurso = c.id
        JOIN 
            DocenteCurso dc ON c.id = dc.idCurso
        JOIN 
            Usuario d ON dc.idDocente = d.id
        WHERE 
            d.username = $1
        AND 
            d.usertype = 'DOCENTE'
    `;

    const values = [idDocente];

    const result = await pool.query(query, values);
    return result.rows; // [{ idEstudiante, nombreEstudiante }]
};


module.exports = { alumnosCursoPorDocente };
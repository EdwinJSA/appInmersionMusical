//src/controllers/usuario.js
const pool = require('../config/conexion_db');

const RecuperarIdDocente = async () => {
    const query = `
        SELECT id FROM Usuario WHERE username = $1 AND usertype = 'DOCENTE'
        returning id
    `;
    const nombreUsuario = session.username;

    const result = await pool.query(query, nombreUsuario);

    return result.rows[0].id;
}

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


const alumnosRegisrados = async() => {
    const query = `
        SELECT
            e.id AS idEstudiante,
            e.nombre AS nombreEstudiante
        FROM 
            Estudiante e
        WHERE 
            e.estado = 'true'
    `;
    const result = await pool.query(query);
    return result.rows;
}

module.exports = { 
    alumnosCursoPorDocente,
    alumnosRegisrados,
    RecuperarIdDocente
};
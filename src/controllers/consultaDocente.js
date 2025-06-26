//src/controllers/usuario.js
const pool = require('../config/conexion_db');

const eliminarEstudiante = async (estudianteId) => {
    const query = `
        DELETE FROM estudiante
        WHERE id = $1
    `;
    const values = [estudianteId];
    await pool.query(query, values);
    console.log(`Estudiante con ID ${estudianteId} eliminado correctamente.`);
};

const obtenerRecomendacionesPorEstudiante = async (estudianteId) => {
    const query = `
        SELECT 
            descripcion,
            fecha
        FROM 
            recomendaciones
        WHERE 
            idestudiante = $1
        ORDER BY
            fecha DESC
    `;
    const values = [estudianteId];
    const result = await pool.query(query, values);
    return result.rows;
}

const agregarNuevaRecomendacion = async (estudianteId, recomendacion) => {
    const query = `
        INSERT INTO recomendaciones (descripcion, idestudiante)
        VALUES ($1, $2)
    `;
    const values = [recomendacion, estudianteId];
    await pool.query(query, values);
};

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

//await consultaDocente.enviarCorreo(idOrigen, idDestino, asunto, cuerpo, archivo_url);
const enviarCorreo = async (origen, idDestino, asunto, cuerpo, archivo_url) => {
    const queryDocente = `
        SELECT id FROM Usuario WHERE username = $1 AND usertype = 'DOCENTE'
    `;
    const valuesDocente = [origen];
    const resultDocente = await pool.query(queryDocente, valuesDocente);
    const idOrigen = resultDocente.rows[0].id;

    const query = `
        INSERT INTO correos (idorigen, iddestino, asunto, cuerpo, linkarchivo)
        VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [idOrigen, idDestino, asunto, cuerpo, archivo_url];
    await pool.query(query, values);
};

module.exports = { 
    alumnosCursoPorDocente,
    alumnosRegisrados,
    RecuperarIdDocente,
    agregarNuevaRecomendacion,
    obtenerRecomendacionesPorEstudiante,
    eliminarEstudiante,
    enviarCorreo
};
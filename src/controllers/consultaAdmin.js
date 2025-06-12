const pool = require('../config/conexion_db');


/*
consultasAdmin.crearNuevoEstudiante(
    nombre,
    numEstudiante,
    edad,
    direccion,
    fechaNacimiento,
    idNuevoUsuario,
    tutor,
    nombreTutor,
    telefonoTutor,
    correoTutor
);
*/

const obtenerEstudiantePorId = async (id) => {
    const query = `SELECT * FROM Estudiante WHERE id = $1
    `;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

const crearNuevoEstudiante = async (nombre, numeroestudiante, edad, direccion, fechanac, idusuario, tutor, nombretutor, telefonotutor, correotutor) => {
    if (!tutor) {
        nombretutor = null;
        telefonotutor = null;
        correotutor = null;
    }
    
    const query = `
        INSERT INTO Estudiante (nombre, numeroEstudiante, edad, direccion, fechanac, estado, idusuario, tutor, nombretutor, celulartutor, correotutor)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id
    `;


    const values = [nombre, numeroestudiante, edad ,direccion, fechanac, true, idusuario, tutor, nombretutor, telefonotutor, correotutor];
    const result = await pool.query(query, values);

    return result.rows[0].id;
}


const crearNuevoUsuario = async (correo, password, tipoUsuario) => {
    const query = `
        INSERT INTO usuario (username, password, usertype)
        VALUES ($1, $2, $3)
        RETURNING id
    `;
    const values = [correo, password, tipoUsuario];
    const result = await pool.query(query, values);
    return result.rows[0].id; 
};

module.exports = {
    crearNuevoEstudiante,
    crearNuevoUsuario,
    obtenerEstudiantePorId
};
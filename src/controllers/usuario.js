//src/controllers/usuario.js
const pool = require('../config/conexion_db');

const validarUsuario = async (username, password, tipoUsuario) => {
    const query = 'SELECT * FROM usuario WHERE username = $1 AND password = $2 AND usertype = $3';
    const values = [username, password, tipoUsuario];
    const result = await pool.query(query, values);
    return result.rows[0];
};


module.exports = { validarUsuario };

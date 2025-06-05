// src/middlewares/auth.js
function verificarSesion(req, res, next) {
    if (req.session.username && req.session.tipoUsuario) {
        return next();
    }   
    return res.redirect('/login');
}

module.exports = verificarSesion;

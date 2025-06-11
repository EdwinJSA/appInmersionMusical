function calcularEdad(fechaNacimiento) {
    const fecha = new Date(fechaNacimiento);
    if (isNaN(fecha)) return NaN;  // Si la fecha no es válida, devuelve NaN

    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();
    const dia = hoy.getDate() - fecha.getDate();

    if (mes < 0 || (mes === 0 && dia < 0)) {
        edad--;
    }
    return edad;
}

function crearContrasena(username, numeroTelefono) {
    const contrasena = username[0] + numeroTelefono;
    return contrasena;
}

module.exports = {
    calcularEdad,
    crearContrasena
};
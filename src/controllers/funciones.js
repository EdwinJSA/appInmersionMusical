require('dotenv').config();
const nodemailer = require('nodemailer');

// Configura el transporte de correos
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_APP_EMAIL,
        pass: process.env.GOOGLE_APP_EMAIL_PASSWORD,
    },
});

function enviarCorreo(destinatarios, nombreEstudiante, usuario, contrasena) {
    destinatarios.forEach(correo => {
        const mailOptions = {
            from: process.env.GOOGLE_APP_EMAIL,
            to: correo,
            subject: 'Bienvenido a Inmersion Musical',
            text: `
¡Hola, ${nombreEstudiante}! 👋  
Gracias por registrarte en nuestra plataforma 😊  

🔐 Tus credenciales de acceso son:  
📧 Correo: ${usuario}  
🔑 Contraseña: ${contrasena}  

🚫 Por tu seguridad, no compartas esta información con nadie.
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("❌ Error al enviar correo a", correo, ":", error.message);
            } else {
                console.log("✅ Correo enviado a", correo, ":", info.response);
            }
        });
    });
}

function calcularEdad(fechaNacimiento) {
    const fecha = new Date(fechaNacimiento);
    if (isNaN(fecha)) return NaN;

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
    crearContrasena,
    enviarCorreo,
};

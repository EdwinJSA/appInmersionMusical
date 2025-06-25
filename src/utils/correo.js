const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.CORREO_ORIGEN,
    pass: process.env.CORREO_PASSWORD,
  },
});

const enviarCorreoReset = async (emailDestino, token) => {
  const enlace = `http://localhost:3000/restablecer/${token}`;
  const opciones = {
    from: `"Inmersión Musical" <${process.env.CORREO_ORIGEN}>`,
    to: emailDestino,
    subject: "Recuperación de contraseña",
    html: `
      <h2>Restablecer Contraseña</h2>
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${enlace}">${enlace}</a>
      <p>Este enlace expirará en 1 hora.</p>
    `,
  };

  await transporter.sendMail(opciones);
};

module.exports = enviarCorreoReset;

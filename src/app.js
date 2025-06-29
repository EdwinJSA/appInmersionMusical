// app.js
const express = require("express");
const path = require("path");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");

require("dotenv").config();
require("./config/conexion_db");

const app = express();
const PORT = process.env.PORT || 3030;

// Middleware de sesión
app.use(
  session({
    secret: "mi_clave_secreta", // Reemplaza con una clave segura en producción
    resave: false,
    saveUninitialized: false,
  })
);

// 🔥 Middleware GLOBAL para que `session` esté disponible en TODAS las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// Configuración de EJS y layouts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "template"));
app.use(expressLayouts);
app.set("layout", "layout"); // Usará 'template/layout.ejs'

// Middlewares para manejar datos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

// Importar rutas
const indexRoutes = require("./routes/index");
const loginRoutes = require("./routes/login");
const docenteRoutes = require("./routes/docente");
const estudianteRoutes = require("./routes/estudiante");
const adminRoutes = require("./routes/admin");
const correoRoutes = require("./routes/correo");
const restablecerRoutes = require("./routes/restablecer");

// Importar middleware de sesión personalizado
const verificarSesion = require("./middlewares/auth");

const gruposRouter = require("./routes/grupos");
app.use("/grupos", gruposRouter);

// Rutas públicas
app.use("/", indexRoutes);
app.use("/", loginRoutes);

// Rutas protegidas con sesión
app.use("/docente", verificarSesion, docenteRoutes);
app.use("/estudiante", verificarSesion, estudianteRoutes);
app.use("/admin", verificarSesion, adminRoutes);
app.use("/mail", verificarSesion, correoRoutes);
app.use("/restablecer", restablecerRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const pool = require('./conexion_db');

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Usuario (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        userType VARCHAR(10) NOT NULL CHECK (userType IN ('ADMIN', 'DOCENTE', 'ESTUDIANTE')) DEFAULT 'ESTUDIANTE',
        status BOOLEAN NOT NULL DEFAULT FALSE
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Estudiante (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        numeroEstudiante VARCHAR(12) NOT NULL UNIQUE,
        edad INTEGER NOT NULL CHECK (edad BETWEEN 5 AND 100),
        direccion VARCHAR(200) NOT NULL,
        fechaNac DATE NOT NULL,
        estado BOOLEAN NOT NULL,
        fecInsc DATE NOT NULL DEFAULT CURRENT_DATE,
        idUsuario INTEGER NOT NULL REFERENCES Usuario(id) ON DELETE CASCADE,
        tutor BOOLEAN NOT NULL DEFAULT FALSE,
        nombreTutor VARCHAR(100),
        celularTutor VARCHAR(12),
        correoTutor VARCHAR(100),
        CHECK (
          tutor = FALSE OR
          (nombreTutor IS NOT NULL AND celularTutor IS NOT NULL AND correoTutor IS NOT NULL)
        )
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Curso (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        background VARCHAR(7) NOT NULL DEFAULT '#FFFFFF'
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS DocenteCurso (
        id SERIAL PRIMARY KEY,
        idDocente INTEGER NOT NULL REFERENCES Usuario(id) ON DELETE CASCADE,
        idCurso INTEGER NOT NULL REFERENCES Curso(id) ON DELETE CASCADE,
        UNIQUE (idDocente, idCurso)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS CursoEstudiante (
        id SERIAL PRIMARY KEY,
        idEstudiante INTEGER NOT NULL REFERENCES Estudiante(id) ON DELETE CASCADE,
        idCurso INTEGER NOT NULL REFERENCES Curso(id) ON DELETE CASCADE,
        UNIQUE (idEstudiante, idCurso)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Notas (
        id SERIAL PRIMARY KEY,
        idEstudiante INTEGER NOT NULL REFERENCES Estudiante(id) ON DELETE CASCADE,
        idCurso INTEGER NOT NULL REFERENCES Curso(id) ON DELETE CASCADE,
        idDocente INTEGER NOT NULL REFERENCES Usuario(id) ON DELETE CASCADE,
        nota DECIMAL(5,2) NOT NULL CHECK (nota >= 0 AND nota <= 100),
        fechaRegistro DATE NOT NULL DEFAULT CURRENT_DATE,
        UNIQUE (idEstudiante, idCurso)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Recomendaciones (
        id SERIAL PRIMARY KEY,
        descripcion TEXT NOT NULL,
        fecha DATE NOT NULL DEFAULT CURRENT_DATE,
        idEstudiante INTEGER NOT NULL REFERENCES Estudiante(id) ON DELETE CASCADE
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Videos (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(100) NOT NULL,
        descripcion TEXT NOT NULL,
        link VARCHAR(1000),
        idCurso INTEGER NOT NULL REFERENCES Curso(id) ON DELETE CASCADE,
        fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        visibilidad BOOLEAN NOT NULL DEFAULT TRUE
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Documentos (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(100) NOT NULL,
        link VARCHAR(1000),
        fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        visibilidad BOOLEAN NOT NULL DEFAULT TRUE,
        idCurso INTEGER NOT NULL REFERENCES Curso(id) ON DELETE CASCADE
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Correos (
        id SERIAL PRIMARY KEY,
        idOrigen INTEGER NOT NULL REFERENCES Usuario(id) ON DELETE CASCADE,
        idDestino INTEGER NOT NULL REFERENCES Usuario(id) ON DELETE CASCADE,
        asunto VARCHAR(100) NOT NULL,
        cuerpo TEXT NOT NULL,
        fecha DATE NOT NULL DEFAULT CURRENT_DATE,
        linkArchivo VARCHAR(1000)
      );
    `);

    console.log('✅ Tablas creadas correctamente');
  } catch (err) {
    console.error('❌ Error al crear las tablas', err);
  } finally {
    await pool.end();
  }
};

createTables();

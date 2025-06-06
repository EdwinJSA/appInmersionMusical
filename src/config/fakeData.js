const pool = require('./conexion_db');

// const insertFakeData = async () => {
//   try {
//     // Usuarios
//     await pool.query(`
//       INSERT INTO Usuario (username, password, userType, status) VALUES
//       ('admin01', 'passAdmin1', 'ADMIN', TRUE),
//       ('docente01', 'passDocente1', 'DOCENTE', TRUE),
//       ('docente02', 'passDocente2', 'DOCENTE', TRUE),
//       ('estudiante01', 'passEstu1', 'ESTUDIANTE', TRUE),
//       ('estudiante02', 'passEstu2', 'ESTUDIANTE', TRUE),
//       ('estudiante03', 'passEstu3', 'ESTUDIANTE', FALSE);
//     `);

//     // Estudiantes
//     await pool.query(`
//       INSERT INTO Estudiante (nombre, numeroEstudiante, edad, direccion, fechaNac, estado, fecInsc, idUsuario, tutor, nombreTutor, celularTutor, correoTutor) VALUES
//       ('Carlos Pérez', 'E20230001', 15, 'Av. Siempre Viva 123, Ciudad', '2008-05-20', TRUE, '2023-02-01', 4, TRUE, 'Ana Pérez', '1234567890', 'ana.perez@mail.com'),
//       ('María López', 'E20230002', 17, 'Calle Falsa 456, Ciudad', '2006-11-10', TRUE, '2023-02-05', 5, FALSE, NULL, NULL, NULL),
//       ('Juan Gómez', 'E20230003', 14, 'Av. Central 789, Ciudad', '2009-08-15', FALSE, '2023-03-01', 6, TRUE, 'Pedro Gómez', '0987654321', 'pedro.gomez@mail.com');
//     `);

//     // Cursos
//     await pool.query(`
//       INSERT INTO Curso (nombre, background) VALUES
//       ('Matemáticas', '#FFDD00'),
//       ('Historia', '#00AABB'),
//       ('Física', '#AA00FF'),
//       ('Literatura', '#FF7700');
//     `);

//     // DocenteCurso
//     await pool.query(`
//       INSERT INTO DocenteCurso (idDocente, idCurso) VALUES
//       (2, 1),
//       (2, 3),
//       (3, 2),
//       (3, 4);
//     `);

//     // CursoEstudiante
//     await pool.query(`
//       INSERT INTO CursoEstudiante (idEstudiante, idCurso) VALUES
//       (1, 1),
//       (1, 2),
//       (2, 2),
//       (2, 4),
//       (3, 3);
//     `);

//     // Notas
//     await pool.query(`
//       INSERT INTO Notas (idEstudiante, idCurso, idDocente, nota, fechaRegistro) VALUES
//       (1, 1, 2, 85.5, '2024-05-01'),
//       (1, 2, 3, 90.0, '2024-05-02'),
//       (2, 2, 3, 78.0, '2024-05-03'),
//       (2, 4, 3, 88.5, '2024-05-04'),
//       (3, 3, 2, 92.0, '2024-05-05');
//     `);

//     // Recomendaciones
//     await pool.query(`
//       INSERT INTO Recomendaciones (descripcion, fecha, idEstudiante) VALUES
//       ('Debe mejorar en comprensión lectora.', '2024-04-20', 1),
//       ('Participar más en clase.', '2024-04-21', 2),
//       ('Revisar ejercicios de física semanalmente.', '2024-04-22', 3);
//     `);

//     // Videos
//     await pool.query(`
//       INSERT INTO Videos (titulo, descripcion, link, idCurso, fecha, visibilidad) VALUES
//       ('Álgebra Básica', 'Video explicando conceptos básicos de álgebra', 'https://youtube.com/video1', 1, '2024-04-01 10:00:00', TRUE),
//       ('Historia de América', 'Resumen de la historia de América Latina', 'https://youtube.com/video2', 2, '2024-04-02 12:00:00', TRUE),
//       ('Leyes de Newton', 'Explicación detallada de las leyes de Newton', 'https://youtube.com/video3', 3, '2024-04-03 14:00:00', FALSE);
//     `);

//     // Documentos
//     await pool.query(`
//       INSERT INTO Documentos (titulo, link, fecha, visibilidad, idCurso) VALUES
//       ('Guía de ejercicios de matemáticas', 'https://docs.com/guia1.pdf', '2024-04-01 09:00:00', TRUE, 1),
//       ('Cronología histórica', 'https://docs.com/cronologia.pdf', '2024-04-02 11:00:00', TRUE, 2),
//       ('Resumen de física', 'https://docs.com/resumen.pdf', '2024-04-03 13:00:00', TRUE, 3);
//     `);

//     // Correos
//     await pool.query(`
//       INSERT INTO Correos (idOrigen, idDestino, asunto, cuerpo, fecha, linkArchivo) VALUES
//       (1, 2, 'Reunión de coordinación', 'Estimado docente, recordamos la reunión este viernes.', '2024-05-01', NULL),
//       (1, 3, 'Entrega de informes', 'Por favor, enviar informes antes del lunes.', '2024-05-01', NULL),
//       (2, 4, 'Tarea pendiente', 'Por favor entregar la tarea de matemáticas.', '2024-05-02', 'https://docs.com/tarea.pdf');
//     `);

//     console.log('✅ Datos ficticios insertados correctamente');
//   } catch (error) {
//     console.error('❌ Error insertando datos ficticios:', error);
//   } finally {
//     await pool.end();
//   }
// };



// insertFakeData();

// const insertarDatosParaConsulta = async () => {
//   try {
//     // Insertar docente con username docente100
//     await pool.query(`
//       INSERT INTO Usuario (username, password, userType, status) VALUES
//       ('docente100', 'passDocente100', 'DOCENTE', TRUE)
//       ON CONFLICT (username) DO NOTHING;
//     `);

//     // Obtener el id del docente insertado
//     const { rows } = await pool.query(`SELECT id FROM Usuario WHERE username = 'docente100'`);
//     const idDocente = rows[0].id;

//     // Insertar cursos
//     await pool.query(`
//       INSERT INTO Curso (nombre, background) VALUES
//       ('Matemáticas Avanzadas', '#123456'),
//       ('Ciencias Naturales', '#654321')
//       ON CONFLICT (nombre) DO NOTHING;
//     `);

//     // Obtener ids de cursos insertados
//     const cursos = await pool.query(`SELECT id, nombre FROM Curso WHERE nombre IN ('Matemáticas Avanzadas', 'Ciencias Naturales')`);
//     const cursoMat = cursos.rows.find(c => c.nombre === 'Matemáticas Avanzadas').id;
//     const cursoCiencias = cursos.rows.find(c => c.nombre === 'Ciencias Naturales').id;

//     // Relacionar docente con cursos
//     await pool.query(`
//       INSERT INTO DocenteCurso (idDocente, idCurso) VALUES
//       ($1, $2),
//       ($1, $3)
//       ON CONFLICT (idDocente, idCurso) DO NOTHING;
//     `, [idDocente, cursoMat, cursoCiencias]);

//     // Insertar estudiantes
//     await pool.query(`
//       INSERT INTO Usuario (username, password, userType, status) VALUES
//       ('estudianteA', 'passA', 'ESTUDIANTE', TRUE),
//       ('estudianteB', 'passB', 'ESTUDIANTE', TRUE),
//       ('estudianteC', 'passC', 'ESTUDIANTE', TRUE)
//       ON CONFLICT (username) DO NOTHING;
//     `);

//     // Obtener ids de usuarios estudiantes
//     const estudiantesUsuarios = await pool.query(`
//       SELECT id, username FROM Usuario WHERE username IN ('estudianteA', 'estudianteB', 'estudianteC')
//     `);

//     // Insertar datos en Estudiante, vinculando con usuarios
//     const estudiantesData = [
//       {
//         nombre: 'Ana Gómez',
//         numeroEstudiante: 'E10001',
//         edad: 16,
//         direccion: 'Calle 1',
//         fechaNac: '2007-06-15',
//         estado: true,
//         idUsuario: estudiantesUsuarios.rows.find(e => e.username === 'estudianteA').id,
//         tutor: false,
//         nombreTutor: null,
//         celularTutor: null,
//         correoTutor: null
//       },
//       {
//         nombre: 'Luis Martínez',
//         numeroEstudiante: 'E10002',
//         edad: 17,
//         direccion: 'Calle 2',
//         fechaNac: '2006-09-23',
//         estado: true,
//         idUsuario: estudiantesUsuarios.rows.find(e => e.username === 'estudianteB').id,
//         tutor: true,
//         nombreTutor: 'Carlos Martínez',
//         celularTutor: '5551234567',
//         correoTutor: 'carlos.martinez@mail.com'
//       },
//       {
//         nombre: 'Sofía Pérez',
//         numeroEstudiante: 'E10003',
//         edad: 15,
//         direccion: 'Calle 3',
//         fechaNac: '2008-02-10',
//         estado: true,
//         idUsuario: estudiantesUsuarios.rows.find(e => e.username === 'estudianteC').id,
//         tutor: false,
//         nombreTutor: null,
//         celularTutor: null,
//         correoTutor: null
//       }
//     ];

//     for (const est of estudiantesData) {
//       await pool.query(`
//         INSERT INTO Estudiante (nombre, numeroEstudiante, edad, direccion, fechaNac, estado, idUsuario, tutor, nombreTutor, celularTutor, correoTutor)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
//         ON CONFLICT (numeroEstudiante) DO NOTHING;
//       `, [est.nombre, est.numeroEstudiante, est.edad, est.direccion, est.fechaNac, est.estado, est.idUsuario, est.tutor, est.nombreTutor, est.celularTutor, est.correoTutor]);
//     }

//     // Obtener ids de estudiantes insertados
//     const estudiantes = await pool.query(`
//       SELECT id, numeroEstudiante FROM Estudiante WHERE numeroEstudiante IN ('E10001', 'E10002', 'E10003')
//     `);

//     // Asignar estudiantes a cursos
//     // Ana y Luis en Matemáticas, Sofía en Ciencias Naturales
//     const estAnaId = estudiantes.rows.find(e => e.numeroEstudiante === 'E10001').id;
//     const estLuisId = estudiantes.rows.find(e => e.numeroEstudiante === 'E10002').id;
//     const estSofiaId = estudiantes.rows.find(e => e.numeroEstudiante === 'E10003').id;

//     await pool.query(`
//       INSERT INTO CursoEstudiante (idEstudiante, idCurso) VALUES
//       ($1, $2),
//       ($3, $2),
//       ($4, $5)
//       ON CONFLICT (idEstudiante, idCurso) DO NOTHING;
//     `, [estAnaId, cursoMat, estLuisId, estSofiaId, cursoCiencias]);

//     console.log('✅ Datos insertados para prueba de alumnos por docente');

//   } catch (error) {
//     console.error('❌ Error insertando datos para consulta:', error);
//   } finally {
//     await pool.end();
//   }
// };

// insertarDatosParaConsulta();


const insertarRelaciones = async () => {
  try {
    // Ids ya conocidos de tus datos existentes
    const idDocente = 1;    // docente "edwinjsa2021@gmail.com"
    const idCurso = 1;      // curso "matematica"
    const idEstudiante = 1; // estudiante "Carlos Pérez"

    // Insertar relación docente-curso (evitando duplicados)
    await pool.query(
      `INSERT INTO DocenteCurso (idDocente, idCurso)
       VALUES ($1, $2)
       ON CONFLICT (idDocente, idCurso) DO NOTHING`,
      [idDocente, idCurso]
    );

    // Insertar relación estudiante-curso (evitando duplicados)
    await pool.query(
      `INSERT INTO CursoEstudiante (idEstudiante, idCurso)
       VALUES ($1, $2)
       ON CONFLICT (idEstudiante, idCurso) DO NOTHING`,
      [idEstudiante, idCurso]
    );

    console.log('✅ Relaciones insertadas correctamente.');

  } catch (error) {
    console.error('❌ Error insertando relaciones:', error.message);
  } finally {
    await pool.end();
  }
};

insertarRelaciones();


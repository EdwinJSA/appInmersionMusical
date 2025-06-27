const pool = require("../config/conexion_db");

// Mostrar grupos y docentes
exports.listarGrupos = async (req, res) => {
  try {
    // Traer docentes
    const docentes = (
      await pool.query(
        "SELECT id, username FROM Usuario WHERE userType = 'DOCENTE'"
      )
    ).rows;

    // Traer grupos (cursos) y docente asignado, evitando duplicados por nombre
    const grupos = (
      await pool.query(`
        SELECT DISTINCT ON (c.nombre) c.id, c.nombre, u.id as docente_id, u.username
        FROM Curso c
        LEFT JOIN DocenteCurso dc ON c.id = dc.idCurso
        LEFT JOIN Usuario u ON dc.idDocente = u.id
        ORDER BY c.nombre, dc.id
      `)
    ).rows.map((g) => ({
      id: g.id,
      nombre: g.nombre,
      docente: g.docente_id ? { id: g.docente_id, username: g.username } : null,
    }));

    res.render("grupos", { grupos, docentes });
  } catch (err) {
    console.error("Error en listarGrupos:", err);
    res.status(500).send("Error al cargar grupos");
  }
};

// Crear grupo y asignar docente
exports.crearGrupo = async (req, res) => {
  const { grupo, docenteId } = req.body;
  try {
    // Crear grupo (curso)
    const result = await pool.query(
      "INSERT INTO Curso (nombre) VALUES ($1) RETURNING id",
      [grupo]
    );
    const cursoId = result.rows[0].id;

    // Asignar docente
    await pool.query(
      "INSERT INTO DocenteCurso (idDocente, idCurso) VALUES ($1, $2)",
      [docenteId, cursoId]
    );

    res.redirect("/grupos");
  } catch (err) {
    console.error("Error en crearGrupo:", err);
    res.status(500).send("Error al crear grupo");
  }
};

// Eliminar grupo
exports.eliminarGrupo = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Curso WHERE id = $1", [id]);
    res.redirect("/grupos");
  } catch (err) {
    console.error("Error en eliminarGrupo:", err);
    res.status(500).send("Error al eliminar grupo");
  }
};

// Editar grupo (nombre)
exports.editarGrupo = async (req, res) => {
  const { id } = req.params;
  const { nuevoNombre } = req.body;
  try {
    await pool.query("UPDATE Curso SET nombre = $1 WHERE id = $2", [
      nuevoNombre,
      id,
    ]);
    res.json({ success: true });
  } catch (err) {
    console.error("Error en editarGrupo:", err);
    res.json({ success: false });
  }
};

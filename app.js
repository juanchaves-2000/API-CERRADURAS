const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let usuarios = [];

// ==========================================
// 1. POST: Crear Usuario
// ==========================================
app.post('/api/usuarios/registro', (req, res) => {
  const { nombre, whatsapp, modulo_capacitacion } = req.body;
  if (!nombre || !whatsapp) {
    return res.status(400).json({ error: "Faltan datos obligatorios." });
  }

  const nuevoUsuario = {
    // Genera un ID secuencial seguro
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nombre: nombre,
    whatsapp: whatsapp,
    modulo_capacitacion: modulo_capacitacion || "No especificado"
  };
  
  usuarios.push(nuevoUsuario);
  res.status(201).json({ mensaje: "Usuario registrado", datos: nuevoUsuario });
});

// ==========================================
// 2. GET: Consultar Usuarios
// ==========================================
app.get('/api/usuarios', (req, res) => {
  res.status(200).json({ total: usuarios.length, usuarios: usuarios });
});

// ==========================================
// 3. PUT: Actualizar Datos de un Usuario
// ==========================================
app.put('/api/usuarios/:id', (req, res) => {
  const idBuscado = parseInt(req.params.id); // Captura el ID de la URL
  const { modulo_capacitacion } = req.body; // Dato a actualizar

  const index = usuarios.findIndex(u => u.id === idBuscado);

  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  // Actualizamos el módulo en la base de datos simulada
  usuarios[index].modulo_capacitacion = modulo_capacitacion;

  res.status(200).json({ 
    mensaje: "Registro actualizado exitosamente", 
    datos: usuarios[index] 
  });
});

// ==========================================
// 4. DELETE: Borrar un Usuario
// ==========================================
app.delete('/api/usuarios/:id', (req, res) => {
  const idBuscado = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === idBuscado);

  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  // Borramos al usuario de la lista
  usuarios.splice(index, 1);

  res.status(200).json({ 
    mensaje: `El usuario con ID ${idBuscado} fue eliminado correctamente` 
  });
});

app.listen(port, () => {
  console.log(`✅ Servidor CRUD ejecutándose en: http://localhost:${port}`);
});
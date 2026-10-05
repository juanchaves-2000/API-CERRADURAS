const express = require('express');
const app = express();
const port = 3000;

// Middleware para que el servidor entienda el formato JSON
app.use(express.json());

// Base de datos simulada en memoria
let usuarios = [];

// ==========================================
// 1. ENDPOINT POST: Registro de Usuarios (y Microchip)
// ==========================================
app.post('/api/usuarios/registro', (req, res) => {
  const { nombre, whatsapp, modulo_capacitacion } = req.body;

  // Validación básica
  if (!nombre || !whatsapp) {
    return res.status(400).json({ 
      error: "Error: El nombre y el número de WhatsApp son obligatorios." 
    });
  }

  // Lógica para el CHIP-JCCP2000
  let detalleModulo = "Asignación estándar";
  if (modulo_capacitacion === "CHIP-JCCP2000") {
    detalleModulo = "¡Microchip inteligente de cerradura (CHIP-JCCP2000) asignado correctamente al usuario!";
  }

  // Creación del nuevo usuario
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: nombre,
    whatsapp: whatsapp,
    modulo_capacitacion: modulo_capacitacion || "No especificado",
    fecha_registro: new Date().toISOString()
  };

  // Guardamos el usuario
  usuarios.push(nuevoUsuario);

  // Respuesta exitosa (Status 201)
  res.status(201).json({
    mensaje: "Usuario registrado con éxito en el sistema.",
    detalle: detalleModulo,
    datos: nuevoUsuario
  });
});

// ==========================================
// 2. ENDPOINT GET: Consultar Usuarios
// ==========================================
app.get('/api/usuarios', (req, res) => {
  // Respuesta exitosa (Status 200)
  res.status(200).json({
    mensaje: "Lista de usuarios obtenida correctamente",
    total: usuarios.length,
    usuarios: usuarios
  });
});

// ==========================================
// Iniciar el servidor
// ==========================================
app.listen(port, () => {
  console.log(`✅ Servidor de pruebas ejecutándose en: http://localhost:${port}`);
  console.log(`👉 Rutas disponibles para Postman:`);
  console.log(`   - [POST] http://localhost:${port}/api/usuarios/registro`);
  console.log(`   - [GET]  http://localhost:${port}/api/usuarios`);
});
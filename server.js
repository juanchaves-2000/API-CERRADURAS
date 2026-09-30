const express = require('express');
const app = express();

app.use(express.json());

// ==========================================================
// SIMULACIÓN DE CONEXIÓN A BASE DE DATOS (MySQL / MariaDB)
// ==========================================================
/* 
// Así se vería tu conexión real a MySQL en el futuro:
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chip_jccp2000_db'
});
db.connect(err => {
    if(err) throw err;
    console.log("Conectado a la Base de Datos MySQL");
});
*/

// Usaremos un arreglo como base de datos temporal para la evidencia
let productos = [
    { id: 1, nombre: "Pro-Scan V1", precio: 450000, stock: 5 },
    { id: 2, nombre: "Office-Pro X", precio: 620000, stock: 3 }
];

// ==========================================================
// DESARROLLO DE SERVICIOS WEB (CRUD DE CERRADURAS)
// ==========================================================

// 1. SERVICIO GET: Consultar todo el catálogo
app.get('/api/productos', (req, res) => {
    res.status(200).json({ status: "success", data: productos });
});

// 2. SERVICIO GET por ID: Consultar un producto específico
app.get('/api/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const producto = productos.find(p => p.id === id);
    if (producto) {
        res.status(200).json({ status: "success", data: producto });
    } else {
        res.status(404).json({ status: "error", message: "Cerradura no encontrada" });
    }
});

// 3. SERVICIO POST: Registrar una nueva cerradura
app.post('/api/productos', (req, res) => {
    const nuevoProducto = {
        id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
        nombre: req.body.nombre,
        precio: req.body.precio,
        stock: req.body.stock || 0
    };
    productos.push(nuevoProducto);
    res.status(201).json({ status: "success", message: "Cerradura registrada correctamente", data: nuevoProducto });
});

// 4. SERVICIO PUT: Actualizar datos de una cerradura existente
app.put('/api/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);
    
    if (index !== -1) {
        productos[index].nombre = req.body.nombre || productos[index].nombre;
        productos[index].precio = req.body.precio || productos[index].precio;
        productos[index].stock = req.body.stock || productos[index].stock;
        
        res.status(200).json({ status: "success", message: "Cerradura actualizada", data: productos[index] });
    } else {
        res.status(404).json({ status: "error", message: "Producto no encontrado para actualizar" });
    }
});

// 5. SERVICIO DELETE: Eliminar una cerradura del catálogo
app.delete('/api/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(p => p.id === id);
    
    if (index !== -1) {
        const productoEliminado = productos.splice(index, 1);
        res.status(200).json({ status: "success", message: "Cerradura eliminada del sistema", data: productoEliminado });
    } else {
        res.status(404).json({ status: "error", message: "Producto no encontrado para eliminar" });
    }
});

// ==========================================================
// INICIALIZACIÓN DEL SERVIDOR
// ==========================================================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Web Services corriendo en http://localhost:${PORT}/api`);
});
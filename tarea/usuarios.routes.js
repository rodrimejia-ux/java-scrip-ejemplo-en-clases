const express = require("express");
const validarUsuario = require("./validarUsuario");

const router = express.Router();

// Datos en memoria
let usuarios = [
    { id: 1, nombre: "Ana", email: "ana@example.com" },
    { id: 2, nombre: "Luis", email: "luis@example.com" },
    { id: 3, nombre: "Maria", email: "maria@example.com" }
];

// Middleware local para este router
function miMiddlewareLocal(req, res, next) {
    console.log(`[Router de Usuarios] Petición recibida: ${req.method} a ${req.originalUrl}`);
    next();
}

router.use(miMiddlewareLocal);

// Listar todos los usuarios
router.get("/", (req, res) => {
    res.status(200).json(usuarios);
});

// Consultar un usuario con ID
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json(usuario);
});

// Crear un nuevo usuario (usando el middleware de validación)
router.post("/", validarUsuario, (req, res) => {
    const { nombre, email } = req.body;

    const nuevoUsuario = {
        id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
        nombre: nombre.trim(),
        email: email.trim()
    };

    usuarios.push(nuevoUsuario);
    res.status(201).json(nuevoUsuario);
});

// Eliminar un usuario por ID
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const indice = usuarios.findIndex(u => u.id === id);

    if (indice === -1) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }

    usuarios.splice(indice, 1);
    res.status(204).send();
});

module.exports = router;

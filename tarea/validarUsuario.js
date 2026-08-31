function validarUsuario(req, res, next) {
    const { nombre, email } = req.body;

    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
        return res.status(400).json({ error: "El campo nombre es obligatorio y debe ser texto no vacio" });
    }

    if (nombre.trim().length < 2) {
        return res.status(400).json({ error: "El campo nombre debe tener al menos 2 caracteres" });
    }

    if (!email || typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({ error: "El campo email es obligatorio y debe ser texto no vacio" });
    }

    if (!email.includes("@")) {
        return res.status(400).json({ error: "El campo email debe contener un @ " });
    }

    next();
}

module.exports = validarUsuario;

function validarTarea(req, res, next) {
    const { titulo, completada } = req.body;

    if (!titulo || typeof titulo !== "string" || titulo.trim() === "") {
        return res.status(400).json({ error: "El campo Titulo es obligatorio y debe ser texto no vacio" });
    }
    
    if (titulo.length > 100) {
        return res.status(400).json({ error: "El campo Titulo no puede tener más de 100 caracteres" });
    }

    if (completada !== undefined && typeof completada !== "boolean") {
        return res.status(400).json({ error: "El campo completada debe ser un valor booleano" });
    }

    next();
}

module.exports = validarTarea;
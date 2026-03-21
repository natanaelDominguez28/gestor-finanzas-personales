const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ mensaje: 'Token requerido' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioId = decoded.id; // lo usamos en los controllers
        next();
    } catch (err) {
        return res.status(403).json({ mensaje: 'Token inválido o expirado' });
    }
};

module.exports = verificarToken;
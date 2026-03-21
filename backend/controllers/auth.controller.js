const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST /auth/registro
const registro = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        const existe = await Usuario.findOne({ email });
        if (existe) return res.status(400).json({ mensaje: 'El email ya está registrado' });

        const hash = await bcrypt.hash(password, 10);
        const usuario = new Usuario({ nombre, email, password: hash });
        await usuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
    } catch (err) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: err.message });
    }
};

// POST /auth/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(400).json({ mensaje: 'Credenciales inválidas' });

        const passwordOk = await bcrypt.compare(password, usuario.password);
        if (!passwordOk) return res.status(400).json({ mensaje: 'Credenciales inválidas' });

        const token = jwt.sign(
            { id: usuario._id, nombre: usuario.nombre },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ token, nombre: usuario.nombre });
    } catch (err) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: err.message });
    }
};

module.exports = { registro, login };
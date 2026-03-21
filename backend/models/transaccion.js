const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransaccionSchema = new Schema({
    monto: { type: Number, required: true, min: [0, 'El monto debe ser positivo'] },
    descripcion: { type: String, required: true },
    tipo: { type: String, enum: ['ingreso', 'gasto'], required: true },
    fecha: { type: Date, default: Date.now, required: true, validate: {
        validator: function(value) {
            return value <= new Date();
        },
        message: 'La fecha no puede ser mayor a la actual.'
    } }
});

module.exports = mongoose.models.Transaccion || mongoose.model('Transaccion', TransaccionSchema);
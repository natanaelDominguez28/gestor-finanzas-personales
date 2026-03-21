const Transaccion = require('../models/transaccion');
const transaccionCtrl = {};

transaccionCtrl.getTransacciones = async (req, res) => {
    try{
       const transacciones = await Transaccion.find({ usuario: req.usuarioId });
       res.json(transacciones); 
    }catch (error) {
        res.status(500).json({
            'status': '0',
            'msg': 'Error obteniendo transacciones'
        });
    }
    
};

transaccionCtrl.createTransaccion = async (req, res) => {
   const transaccion = new Transaccion({ ...req.body, usuario: req.usuarioId });
   try {
        await transaccion.save();
        res.status(201).json({
            'status': '1',
            'msg': 'Transaccion creada'
        });
   } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion'
        });
   }
}

transaccionCtrl.getTransaccion = async (req, res) => {
    try {
        const transaccion = await Transaccion.findOne({ _id: req.params.id, usuario: req.usuarioId }); 
        if (!transaccion) return res.status(404).json({ status: '0', msg: 'Transaccion no encontrada' });
        res.json(transaccion);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error obteniendo transaccion' });
    }    
}

transaccionCtrl.editTransaccion = async (req, res) => {
    try {
        const result = await Transaccion.updateOne(
            { _id: req.params.id, usuario: req.usuarioId }, 
            req.body
        );
        if (result.matchedCount === 0) return res.status(404).json({ status: '0', msg: 'Transaccion no encontrada' });
        res.json({ status: '1', msg: 'Transaccion updated' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando la operacion' });
    }
};

transaccionCtrl.deleteTransaccion = async (req, res) => {
    try {
        const result = await Transaccion.deleteOne({ _id: req.params.id, usuario: req.usuarioId });
        if (result.deletedCount === 0) return res.status(404).json({ status: '0', msg: 'Transaccion no encontrada' });
        res.json({ status: '1', msg: 'Transaccion deleted' });
    } catch (error) {
        res.status(400).json({ status: '0', msg: 'Error procesando la operacion' });
    }
};

module.exports = transaccionCtrl;


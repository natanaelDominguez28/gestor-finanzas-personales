const Transaccion = require('../models/transaccion');
const transaccionCtrl = {};

transaccionCtrl.getTransacciones = async (req, res) => {
    const transacciones = await Transaccion.find();
    res.json(transacciones);
};

transaccionCtrl.createTransaccion = async (req, res) => {
   const transaccion = new Transaccion(req.body);
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
    const transaccion = await Transaccion.findById(req.params.id);
    res.json(transaccion);    
}

transaccionCtrl.editTransaccion = async (req, res) => {
    const vtransaccion = new Transaccion(req.body);
    try {
        await Transaccion.updateOne({_id: req.params.id}, vtransaccion);    
        res.status(201).json({
            'status': '1',
            'msg': 'Transaccion updated'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        });
    }
}

transaccionCtrl.deleteTransaccion = async (req, res) => {
    try {
        await Transaccion.deleteOne({_id: req.params.id});    
        res.status(201).json({
            'status': '1',
            'msg': 'Transaccion deleted'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        });
    }
}

module.exports = transaccionCtrl;


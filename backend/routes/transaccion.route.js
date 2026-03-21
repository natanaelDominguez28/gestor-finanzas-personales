const transaccionCtrl = require('../controllers/transaccion.controller');
const express = require('express');
const router = express.Router();

router.get('/', transaccionCtrl.getTransacciones);
router.get('/:id', transaccionCtrl.getTransaccion);
router.post('/', transaccionCtrl.createTransaccion);
router.put('/:id', transaccionCtrl.editTransaccion);
router.delete('/:id', transaccionCtrl.deleteTransaccion);

module.exports = router;
const transaccionCtrl = require('../controllers/transaccion.controller');
const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth.middleware');

router.get('/', verificarToken, transaccionCtrl.getTransacciones);
router.get('/:id', verificarToken, transaccionCtrl.getTransaccion);
router.post('/', verificarToken, transaccionCtrl.createTransaccion);
router.put('/:id', verificarToken, transaccionCtrl.editTransaccion);
router.delete('/:id', verificarToken, transaccionCtrl.deleteTransaccion);

module.exports = router;
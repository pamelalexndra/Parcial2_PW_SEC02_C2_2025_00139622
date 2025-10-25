const express = require('express');
const router = express.Router();
const {
  getAllCuentas,
  getCuentaById,
  getCuentasByQuery,
  getCuentasBalance
} = require('../controllers/cuentas.controller'); 

// Ruta para obtener el balance total 
router.get('/cuentasBalance', getCuentasBalance);

// Ruta para obtener todas las cuentas 
router.get('/cuentas', (req, res) => {
  if (Object.keys(req.query).length > 0) {
    getCuentasByQuery(req, res);
  } else {
    getAllCuentas(req, res);
  }
});

// Ruta para obtener cuenta por ID 
router.get('/cuenta/:id', getCuentaById);

module.exports = router;

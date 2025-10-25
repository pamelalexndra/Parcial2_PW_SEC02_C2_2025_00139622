const cuentas = require('../data/cuentas.data');

// Obtener todas las cuentas
const getAllCuentas = (req, res) => {
  try {
    res.status(200).json({
      count: cuentas.length,
      data: cuentas
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener las cuentas',
      message: error.message
    });
  }
};

// Obtener cuenta por ID 
const getCuentaById = (req, res) => {
  try {
    const { id } = req.params;
    const cuenta = cuentas.find(c => c.id === id);

    if (cuenta) {
      res.status(200).json({
        finded: true,
        account: cuenta
      });
    } else {
      res.status(404).json({
        finded: false,
        account: null
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Error al buscar la cuenta',
      message: error.message
    });
  }
};

// Buscar cuentas por parámetro de consulta (id, name o gender)
const getCuentasByQuery = (req, res) => {
  try {
    const { id, name, gender } = req.query;

    if (id) {
      const cuenta = cuentas.find(c => c.id === id);
      if (cuenta) return res.status(200).json({ finded: true, account: cuenta });
      return res.status(404).json({ finded: false, account: null });
    }

    if (name) {
      const results = cuentas.filter(c =>
        c.name && c.name.toLowerCase().includes(name.toLowerCase())
      );
      if (results.length === 0) return res.status(404).json({ finded: false, data: [] });
      if (results.length === 1) return res.status(200).json({ finded: true, account: results[0] });
      return res.status(200).json({ finded: true, data: results });
    }

    if (gender) {
      const results = cuentas.filter(c =>
        c.gender && c.gender.toLowerCase() === gender.toLowerCase()
      );
      if (results.length === 0) return res.status(404).json({ finded: false, data: [] });
      if (results.length === 1) return res.status(200).json({ finded: true, account: results[0] });
      return res.status(200).json({ finded: true, data: results });
    }

    res.status(400).json({
      error: 'Debe proporcionar al menos un parámetro de consulta: id, name o gender'
    });

  } catch (error) {
    res.status(500).json({
      error: 'Error al buscar las cuentas',
      message: error.message
    });
  }
};

// Obtener el balance total de todas las cuentas activas 
const getCuentasBalance = (req, res) => {
  try {
    const cuentasActivas = cuentas.filter(c => c.isActive === true);

    if (cuentasActivas.length === 0) {
      return res.status(200).json({
        status: false,
        accountBalance: 0
      });
    }

    const total = cuentasActivas.reduce((sum, cuenta) => {
      const num = parseFloat(String(cuenta.balance).replace(/[$,]/g, '')) || 0;
      return sum + num;
    }, 0);

    const rounded = Math.round((total + Number.EPSILON) * 100) / 100;

    res.status(200).json({
      status: true,
      accountBalance: rounded
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al calcular el balance',
      message: error.message
    });
  }
};

module.exports = {
  getAllCuentas,
  getCuentaById,
  getCuentasByQuery,
  getCuentasBalance
};

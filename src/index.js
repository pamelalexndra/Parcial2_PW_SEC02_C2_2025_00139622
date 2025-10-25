const express = require('express');
const cuentasRoutes = require('./routes/cuentas.routes');

const app = express();
const PORT = 3130;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta default
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido al servidor de Cuentas Bancarias',
    version: '1.0.0',
    endpoints: {
      getAllCuentas: 'GET /cuentas',
      getCuentaById: 'GET /cuenta/:id',
      searchCuentas: 'GET /cuentas?id=value or ?name=value or ?gender=value',
      getTotalBalance: 'GET /cuentasBalance'
    }
  });
});

// Rutas
app.use('/', cuentasRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.url
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Endpoints:`);
  console.log(`   GET /cuentas - Obtener todas las cuentas (devuelve {count, data})`);
  console.log(`   GET /cuenta/:id - Obtener cuenta por ID (devuelve {finded, account})`);
  console.log(`   GET /cuentas?[id|name|gender] - Buscar cuentas por parámetro (devuelve {finded, account} o {finded, data})`);
  console.log(`   GET /cuentasBalance - Obtener balance total (devuelve {status, accountBalance})`);
});

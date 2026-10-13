
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./config/database');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API Conta D’Água funcionando!',
  });
});

app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT current_database() AS database, NOW() AS time'
    );

    res.json({
      status: 'ok',
      message: 'Conexão com PostgreSQL estabelecida!',
      database: result.rows[0].database,
      time: result.rows[0].time,
    });
  } catch (error) {
    console.error('Erro ao consultar PostgreSQL:', error.message);

    res.status(500).json({
      status: 'error',
      message: 'Não foi possível conectar ao banco de dados.',
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API Conta D’Água rodando na porta ${PORT}`);
});

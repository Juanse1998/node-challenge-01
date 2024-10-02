require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`La hora actual en la base de datos es: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al conectarse a la base de datos');
  }
});

app.listen(port, () => {
  console.log(`Backend corriendo en http://localhost:${port}`);
});

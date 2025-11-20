const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());


const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "delivery_app",
  password: "admin",
  port: 5432
});


async function initDB() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS restaurants (
      id SERIAL PRIMARY KEY,
      name TEXT,
      cuisine TEXT
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS menu_items (
      id SERIAL PRIMARY KEY,
      restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
      name TEXT,
      price REAL
    );
  `);

  console.log("Tabelas criadas.");


  const count = await db.query("SELECT COUNT(*) FROM restaurants");
  
  if (count.rows[0].count === "0") {
    console.log("Inserindo dados iniciais...");

    await db.query(`
      INSERT INTO restaurants (name, cuisine) VALUES
      ('Pizzaria Central', 'Pizza'),
      ('Burger House', 'Burgers'),
      ('Temaki Zen', 'Japanese');
    `);

    await db.query(`
      INSERT INTO menu_items (restaurant_id, name, price) VALUES
      (1, 'Margherita', 25.0),
      (1, 'Calabresa', 28.0),
      (2, 'Cheeseburger', 22.0),
      (2, 'Bacon Burger', 26.0),
      (3, 'Temaki Salmão', 18.0);
    `);

    console.log("Seed completo!");
  }
}
initDB();


app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, password]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: "email already exists" });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query(
      "SELECT id, name, email FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0)
      return res.status(401).json({ error: "invalid credentials" });

    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "db error" });
  }
});


app.get('/api/restaurants', async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM restaurants");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "db error" });
  }
});


app.get('/api/restaurants/:id/menu', async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM menu_items WHERE restaurant_id = $1",
      [req.params.id]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "db error" });
  }
});


app.post('/api/orders', async (req, res) => {
  const { userId, restaurantId, items, total } = req.body;

  console.log("Novo pedido recebido:", {
    userId,
    restaurantId,
    items,
    total
  });

  res.json({
    ok: true,
    orderId: Date.now()
  });
});


const PORT = 4000;
app.listen(PORT, () => {
  console.log("Backend rodando na porta " + PORT);
});

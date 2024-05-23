const express = require('express');
const mysql = require('mysql2');

const app = express(3000);



const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'expressdb'
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(express.json());


app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results);
  });
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results[0]);
  });
});

app.post('/users', (req, res) => {
  const { name, email, age } = req.body;
  const query = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';

  db.query(query, [name, email, age], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    res.status(201).send('User created');
  });
});


app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email, age } = req.body;
  const query = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';

  db.query(query, [name, email, age, userId], (err, results) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).send('Error updating data');
      return;
    }
    res.send('User updated');
  });
});


app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM users WHERE id = ?';

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error deleting data:', err);
      res.status(500).send('Error deleting data');
      return;
    }
    res.send('User deleted');
  });
});


app.listen(3000, () => {
  console.log('Le serveur Express fonctionne sur le port 3000');
});

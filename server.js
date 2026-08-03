const express = require("express");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(__dirname));

// ==============================
// DATABASE
// ==============================

const db = new sqlite3.Database("database.db");

db.run(`

CREATE TABLE IF NOT EXISTS topics (

id INTEGER PRIMARY KEY AUTOINCREMENT,

title TEXT,

author TEXT,

category TEXT,

content TEXT,

date TEXT

)

`);

// ==============================
// RECUPERER SUJETS
// ==============================

app.get("/api/topics", (req, res) => {
  db.all(
    "SELECT * FROM topics ORDER BY id DESC",

    (err, rows) => {
      if (err) return res.json([]);

      res.json(rows);
    },
  );
});

// ==============================
// CREER SUJET
// ==============================

app.post("/api/topics", (req, res) => {
  const { title, author, category, content } = req.body;

  db.run(
    `

INSERT INTO topics

(title,author,category,content,date)

VALUES (?,?,?,?,?)

`,

    [title, author, category, content, new Date().toLocaleDateString()],

    () => {
      res.json({
        success: true,
      });
    },
  );
});

app.listen(PORT, () => {
  console.log(`Serveur Focus Autosplitter lancé sur http://localhost:${PORT}`);
});

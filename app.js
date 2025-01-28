const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

// Database connection
const db = new sqlite3.Database(':memory:');

// Initialize an in-memory database table
db.serialize(() => {
    db.run("CREATE TABLE Users (id INT, name TEXT)");
    db.run("INSERT INTO Users (id, name) VALUES (1, 'Alice')");
});

// Vulnerable route
app.get('/user', (req, res) => {
    const userId = req.query.id; // Unsanitized input
    const query = `SELECT * FROM Users WHERE id = ${userId}`; // Vulnerable to SQL Injection

    db.get(query, (err, row) => {
        if (err) {
            res.status(500).send("Database error");
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).send("User not found");
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

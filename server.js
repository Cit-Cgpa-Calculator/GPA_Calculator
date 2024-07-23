const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',
    user: 'sql12721705',
    password: 'byJ4gxnY7w',
    database: 'sql12721705'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

app.post('/getCredits', (req, res) => {
    const { subjects } = req.body;
    const placeholders = subjects.map(() => '?').join(',');
    const query = `SELECT sub_id, credits FROM CGPA WHERE sub_id IN (${placeholders})`;

    db.query(query, subjects, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

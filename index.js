const express = require('express');
const { dnsPrefetchControl } = require('helmet');
let mysql = require('mysql2');
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Asti22##',
    database: 'Biodata',
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database.');
});

app.get('api/mahasiswa', (req, res) => {
    db.query('SELECT * FROM mahasiswa', (err, result)=>{
        if(err) {
            console.error('error executing query:' + err.stack);
            res.status(500).send('error fetching users');
            return;
        }
        res.json(results);
    });
});

app.post('/api/mahasiswa', (req, res) => {
    const { nama, nim, kelas, prodi } = req.body;

    if (!nama || !nim || !kelas || !prodi) {
        return res.status(400).json({ message: 'nama, nim, kelas, prodi wajib diisi' });
    }

    db.query(
        'INSERT INTO mahasiswa (nama, nim, kelas, prodi) VALUES (?, ?, ?, ?)',
        [nama, nim, kelas, prodi],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.status(201).json({ message: 'User created successfully' });
        }
    );
});


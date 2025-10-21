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

app.post( )





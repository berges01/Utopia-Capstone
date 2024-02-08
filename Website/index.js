const express = require('express');
const app = express();


// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the applications static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);
count = {
    number: 0,
};
// CreateAuth token for a new user
apiRouter.post('/chirpstack', async (req, res) => {
    buffer = Buffer.from(req.body.data, "base64")
    count.number = buffer.readUInt8(0)

});

apiRouter.get('/count', async (req, res) => {

    res.send(count);
});

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'erik1999',
    database: 'HistoricalTrailData'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.get('/getTableData', (req, res) => {
    connection.query('SELECT * FROM TrailUserData ORDER BY id DESC LIMIT 10;', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error retrieving data from database' });
        } else {
            res.json(results);
        }
    });
});

app.get('/', function (req, res) {
    res.render('index', {});
  });

// Define route for the '/WebsiteData.html' URL
app.get('/WebsiteData.html', function(req, res) {
    res.sendFile(path.join(__dirname, 'WebsiteData.html'));
});
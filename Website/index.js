const express = require('express');
const app = express();
const db = require('./database.js')


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
apiRouter.post('/chirpstack', async (req, res) => {
    buffer = Buffer.from(req.body.data, "base64")
    count.number = buffer.readUInt8(0)

});

apiRouter.post('/db', async (req, res) => {
    const time = req.body.time
    const id = req.body.deviceInfo.devEui
    const count = req.body.data
    db.insertNum(id, count, time)
})
apiRouter.get('/historical/data', async (req, res) => {
    // Get db id from front-end to send here 
    try {
    const database = await db.getDb('TrailUserData')
    if (database) {
        res.status(200)
        res.send(database)
    }
    } catch (error) {
        console.log(error)
    }
})

apiRouter.get('/count', async (req, res) => {
    res.send(count);
});


const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
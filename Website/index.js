const express = require('express');
const app = express();
const db = require('./database.js')
const heatpoint = require('./heatpoint.js')


// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the applications static content
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

uplink = {
    body: {
        time: '2024-02-29T23:32:12.313+00:00',
        deviceInfo: {
          devEui: '2232330000888809',
        },
        data: 'AA=='
    }
};

apiRouter.post('/db', async (req, res) => {
    uplink = req
    console.log(uplink)
    const time = req.body.time
    const id = req.body.deviceInfo.devEui
    const count = req.body.data
    try {
        let result = await db.insertNum(id, count, time)
        if (result) {
            res.status(200)
            res.send('Inserted Successfully')
        }
    } catch (error) {
        res.status(505)
        console.log(error)
    }

    heatpoint.create(uplink);
})
apiRouter.get('/historical/data', async (req, res) => {
    try {
        const database = await db.getDb('TrailUserData')
        if (database) {
            res.status(200)
            res.send(database)
        }
    } catch (error) {
        res.status(505)
        console.log(error)
    }
})
apiRouter.get('/latest/count', async (req, res) => {
    try {
        const heatpoints = await heatpoint.get()
        if (heatpoints) {
            res.status(200)
            res.send(heatpoints)
        }
    } catch (error) {
        res.status(505)
        console.log(error)
    }
})
const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
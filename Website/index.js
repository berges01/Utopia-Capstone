const express = require('express');
const app = express();
const db = require('./database.js')
const heatpoint = require('./heatpoint.js')
const { URL } = require('url');
const querystring = require('querystring');

const restrictIP = (req, res, next) => {
    const allowedIPone = process.env.IPONE
    const allowedIPtwo = process.env.IPTWO
    let clientIP = req.ip
    if (clientIP.startsWith('::ffff:')) {
        clientIP = clientIP.slice(7)
    }
    if (req.method === 'POST' && clientIP !== allowedIPtwo && clientIP !== allowedIPone) {
        return res.status(403).send('Forbidden')
    }
    next()
}

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4945;

// JSON body parsing using built-in middleware
app.use(express.json());

// Restrict IP
app.use(restrictIP);

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
    let time
    let id
    let count
    try {
        uplink = req
        if (req.body.time && req.body.deviceInfo.devEui && req.body.data) {
            time = req.body.time
            id = req.body.deviceInfo.devEui
            count = req.body.data
        }
    } catch (error) {
        console.log(error)
    }
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

    heatpoint.create(id, count, time);
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
apiRouter.get('/filter/location', async (req, res) => {
    const req_url = new URL(req.url, `http://${req.headers.host}`)
    const param = querystring.parse(req_url.searchParams.toString())
    const location = param.location
    const data_based_location = await db.getDataLocation(location)
    if (data_based_location) {
        res.status(200)
        res.send(data_based_location)
    }
    else {
        res.status(505)
        res.send("Something went wrong with data retrieval")
    }
})
apiRouter.get('/filter/day', async (req, res) => {
    const req_url = new URL(req.url, `http://${req.headers.host}`)
    const param = querystring.parse(req_url.searchParams.toString())
    const day = param.day
    const data_based_day = await db.getDataDay(day)
    if (data_based_day) {
        res.status(200)
        res.send(data_based_day)
    }
    else {
        res.status(505)
        console.log('Something went wrong with data retrieval')
    }
})
const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

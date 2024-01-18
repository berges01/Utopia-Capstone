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
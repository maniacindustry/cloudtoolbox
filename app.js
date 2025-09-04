require("dotenv").config();
const appInfo = require('./package.json');
const SimpleNodeLogger = require('simple-node-logger'),
opts = {
        level: "debug",
        logFilePath:'cloudtoolbox.log',
        timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
},
log = SimpleNodeLogger.createSimpleLogger(opts);
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  let data = {
    name: appInfo.name,
    endpoints: ['/publicip'],
    version: appInfo.version
  };
  res.json(data);
});

app.get('/publicip', async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.connection.remoteAddress || req.socket.remoteAddress;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.status(200).send(ip);
});

var port = process.env.PORT || 80;
app.listen(port, async () => {
  log.info('App started | Port ' + port);
});

require("dotenv").config();
const SimpleNodeLogger = require('simple-node-logger'),
opts = {
        level: "debug",
        logFilePath:'application.log',
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
  let data = {version: 1};
  res.json(data);
})

var port = process.env.PORT || 80;
app.listen(port, async () => {
  log.info('server listen | Port ' + port);
});

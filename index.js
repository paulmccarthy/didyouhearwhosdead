const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const config = require('config');
const path = require('path');

const WikiAPI = require('./src/WikiAPI');
const API = require('./src/API/v1');

const wikiApi = new WikiAPI(config.get('wiki.accessToken'));
const api = API(wikiApi);

const app = express();

app.use(morgan('short'));
app.use(compression());
app.use(helmet());

// static files
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/css', express.static(path.join(__dirname, 'src/www/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist/jquery.min.js')));
app.use('/js', express.static(path.join(__dirname, 'src/www/js')));
app.use('/favicons', express.static(path.join(__dirname, 'src/www/favicons')));
app.use('/images', express.static(path.join(__dirname, 'src/www/images')));

// backend api
app.use('/api', api);

// error handler
const handler = (err, req, res, next) => {
    res.status(500).send({
        message: '500: Error',
        statusCode: 500
    });
};

app.use(handler);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/www/index.html'));
});

app.listen(config.server.port, config.server.host, () => {
    console.log(`Server started on ${config.server.host}:${config.server.port}`);
});

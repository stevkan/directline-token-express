const express = require('express');
const http = require('http');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const log = require('console').log;
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomUUID } = require('crypto');
// const store = require('store');
// const { json } = require('body-parser');
// const { stringify } = require('querystring');
// const { Shortener } = require('./server/urlShortener/shortener');
// const shortener = new Shortener();


require('dotenv').config({ path: path.join(__dirname, '.env') });

const routes = require('./routes/index');

const app = express();
const server = http.createServer(app);

// Express CORS doc: https://expressjs.com/en/resources/middleware/cors.html#configuring-cors-w-dynamic-origin
const allowlist = ['https://webchats.ngrok.io', 'https://common-relay.servicebus.windows.net'];
let corsOptions;
const corsOptionsDelegate = (req, callback) => {
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      allowedHeaders: [
        'Authorization',
        'Ocp-Apim-Subscription-Key',
        'Scope',
        'ms-agent',
        'token',
        'content-type',
      ],
      credentials: false,
      preflightContinue: true,
      optionsSuccessStatus: 200,
    };
  } else {
    corsOptions = {
      origin: false,
    };
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(logger('dev', {}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptionsDelegate));
app.options('*', cors(corsOptionsDelegate));
app.use(
  bodyParser.json({
    extended: false,
  }),
);
app.set('port', process.env.PORT || 3500);

app.use('/', routes.directLineAseRefresh(corsOptions, randomUUID));
app.use('/', routes.directLineAseRouter(corsOptionsDelegate, randomUUID));
app.use('/', routes.directLineRouter(corsOptions));
app.use('/', routes.conversationsRouter(corsOptions));
app.use('/', routes.getJsonRouter(corsOptions));
app.use('/', routes.githubWebhookRouter(corsOptions));
app.use('/', routes.historyRouter(corsOptions));
app.use('/', routes.postJsonRouter(corsOptions));
app.use('/', routes.refreshRouter(corsOptions));
app.use('/', routes.reconnectRouter(corsOptions));
app.use('/', routes.speechServicesRouter(corsOptions));
app.use('/', routes.webchatRouter(corsOptions));

server.listen(app.get('port'), () => {
  log(`\nServer listening on http://localhost:${app.get('port')}`);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.server.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = server;

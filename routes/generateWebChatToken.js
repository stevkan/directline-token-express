const request = require('request');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const log = require('console').log;

const webchatRouter = (corsOptions) => {
  return router.post('/webchat/token', cors(corsOptions), (req, res, next) => {
    // userId must start with `dl_`
    // const userId = (req.body && req.body.id) ? req.body.id : `dl_${ Date.now() + Math.random().toString(36) }`;
    const options = {
      // method: 'POST',
      uri: 'https://webchat.botframework.com/api/tokens',
      headers: {
        Authorization: `Bearer ${process.env.WEB_CHAT_SECRET}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    request.get(options, (error, response, body) => {
      body = JSON.parse(body);
      if (!error && response.statusCode <= 399) {
        res.send(body);
        log(`Someone requested a Web Chat token...(${response.statusCode})`);
      } else if (response.statusCode >= 400 && response.statusCode < 500) {
        res.send({
          statusCode: response.statusCode,
          error: "Web Chat's generate token API returned error",
        });
      } else if (response.statusCode >= 500) {
        res.status(response.statusCode);
        res.send({
          statusCode: response.statusCode,
          error: "Web Chat's generate token API couldn't be reached",
        });
      }
    });
  });
};

module.exports = webchatRouter;

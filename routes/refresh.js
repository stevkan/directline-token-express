const request = require('request');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const log = require('console').log;

const refreshRouter = (corsOptions) => {
  return router.post('/directline/refresh', cors(corsOptions), (req, res, next) => {
    const { token } = req.body;
    // userId must start with `dl_`
    const userId =
      req.body && req.body.id ? req.body.id : `dl_${Date.now() + Math.random().toString(36)}`;
    const options = {
      // method: 'POST',
      uri: 'https://directline.botframework.com/v3/directline/tokens/refresh',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      json: {
        user: {
          ID: userId,
        },
      },
    };
    request.post(options, (error, response, body) => {
      if (!error && response.statusCode <= 399) {
        res.send(body);
        log(`Someone refreshed a token...(${response.statusCode})`);
      } else if (response.statusCode >= 400 && response.statusCode < 500) {
        res.send({
          statusCode: response.statusCode,
          error: "Direct Line's token refresh API returned error",
        });
      } else if (response.statusCode >= 500) {
        res.status(response.statusCode);
        res.send({
          statusCode: response.statusCode,
          error: "Direct Line's token refresh API couldn't be reached",
        });
      }
    });
  });
};

module.exports = refreshRouter;

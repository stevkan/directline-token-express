const request = require('request');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const log = require('console').log;

const directLineRouter = (corsOptions) => {
  return router.post('/directline/token', cors(corsOptions), (req, res, next) => {
    // userId must start with `dl_`
    const userId =
      req.body && req.body.id ? req.body.id : `dl_${Date.now() + Math.random().toString(36)}`;
    const options = {
      // method: 'POST',
      uri: 'https://directline.botframework.com/v3/directline/tokens/generate',
      headers: {
        Authorization: `Bearer ${process.env.BOTBERG2}`,
        'Access-Control-Allow-Origin': '*',
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
        log(`Someone requested a Direct Line token...(${response.statusCode})`);
      } else if (response.statusCode >= 400 && response.statusCode < 500) {
        res.status(response.statusCode);
        res.send({
          statusCode: response.statusCode,
          error: "Direct Line's generate token API returned error",
        });
      } else if (response.statusCode >= 500) {
        res.status(response.statusCode);
        res.send({
          statusCode: response.statusCode,
          error: "Direct Line's generate token API couldn't be reached",
        });
      }
    });
  });
}


module.exports = directLineRouter;

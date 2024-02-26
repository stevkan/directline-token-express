const request = require('request');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const log = require('console').log;

const historyRouter = (corsOptions) => {
  return router.post('/directline/history', cors(corsOptions), (req, res, next) => {
    const { conversationId } = req.body;
    const { token } = req.body;
    log(conversationId);
    const options = {
      // method: 'GET',
      uri: `https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    request.get(options, (error, response, body) => {
      log(body);
      // body = JSON.parse(body);
      if (!error && response.statusCode <= 399) {
        res.send(body);
        log(`Someone reconnected to a conversation...(${response.statusCode})`);
      } else if (response.statusCode >= 400 && response.statusCode < 500) {
        res.send({
          statusCode: response.statusCode,
          error: "Direct Line's history API returned error",
        });
      } else if (response.statusCode >= 500) {
        res.status(response.statusCode);
        res.send({
          statusCode: response.statusCode,
          error: "Direct Line's history API couldn't be reached",
        });
      }
    });
  });
};

module.exports = historyRouter;

const request = require('request');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const log = require('console').log;

const reconnectRouter = (corsOptions) => {
  return router.post('/directline/reconnect', cors(corsOptions), (req, res, next) => {
    // const { groupChatId } = req.body;
    // const data = store.get(groupChatId);
    const { token } = req.body;
    const { conversationId } = req.body;
    const watermark = !req.body.watermark ? 0 : req.body.watermark;
    const options = {
      // method: 'GET',
      uri: `https://directline.botframework.com/v3/directline/conversations/${conversationId}?watermark=${watermark}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    request.get(options, (error, response, body) => {
      body = JSON.parse(body);
      if (!error && response.statusCode <= 399) {
        res.send(body);
        log(`Someone reconnected to a conversation...(${response.statusCode})`);
      } else if (response.statusCode >= 400 && response.statusCode < 500) {
        res.send({
          statusCode: response.statusCode,
          error: "Direct Line's reconnect API returned error",
        });
      } else if (response.statusCode >= 500) {
        res.status(response.statusCode);
        res.send({
          statusCode: response.statusCode,
          error: "Direct Line's reconnect API couldn't be reached",
        });
      }
    });
  });
};

module.exports = reconnectRouter;

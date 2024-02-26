const request = require('request');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const log = require('console').log;

const conversationsRouter = (corsOptions) => {
  return router.post('/directline/conversations', cors(corsOptions), (req, res, next) => {
    const { conversationId } = req.body;
    const URI = conversationId
      ? `https://directline.botframework.com/v3/directline/conversations/${conversationId}`
      : 'https://directline.botframework.com/v3/directline/conversations';
    const userId =
      req.body && req.body.id ? req.body.id : `dl_${Date.now() + Math.random().toString(36)}`;
    const options = {
      uri: URI,
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
    request.post(options, async (error, response, body) => {
      if (!error && response.statusCode <= 399) {
        // const data = await shortener.getShortUrl(body);
        // body.url = data.shortUrl;
        // body.groupChatId = data.groupChatId;
        body.statusCode = response.statusCode;
        // console.log('BODY ', body);
        res.send(body);
        log(`Someone started a conversation...(${response.statusCode})`);
        log(body);
      } else if (response.statusCode >= 400 && response.statusCode < 500) {
        res.send({
          statusCode: response.statusCode,
          error: "Direct Line's conversations API returned error",
        });
      } else if (response.statusCode >= 500) {
        res.status(response.statusCode);
        res.send({
          statusCode: response.statusCode,
          error: "Direct Line's conversations API couldn't be reached",
        });
      }
    });
  });
};

module.exports = conversationsRouter;

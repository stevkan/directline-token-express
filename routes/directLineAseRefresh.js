const request = require('request');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const log = require('console').log;

const directLineAseRefresh = (corsOptions, randomUUID) => {
  return router.post('/directline-ase/refresh', cors(corsOptions), async (req, res) => {
    const { authorizationToken, conversationId } = req.body;
    const URI = 'https://directline-app-bot.azurewebsites.net/.bot/v3/directline/token/refresh';

    const userId = `dl_${randomUUID()}`;
    // userId must start with `dl_`
    const options2 = {
      // uri: 'https://botport.ngrok.io/.bot/v3/directline/tokens/generate',
      uri: URI,
      headers: {
        Authorization: `Bearer ${authorizationToken}`,
      },
      json: {
        User: {
          Id: userId,
        },
      },
    };

    await request.post(options2, (error, response, body) => {
      const data = {
        authorizationToken: body.token,
        conversationId: body.conversationId,
        userToken: 'userToken.token',
      };
      if (!error && response.statusCode <= 399) res.send(data);
      else {
        log('ERROR ', body);
        res.statusMessage = 'Call to retrieve token from DirectLine failed';
        res.status(500);
        res.send(data);
        return res;
      }
    });
  });
};

module.exports = directLineAseRefresh;

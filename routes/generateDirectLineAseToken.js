const request = require('request');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const log = require('console').log;

const directLineAseRouter = (corsOptionsDelegate, randomUUID) => {
  return router.post('/directline-ase/token', cors(corsOptionsDelegate), async (req, res) => {
    const URI = 'https://directline-app-bot.azurewebsites.net/.bot/v3/directline/tokens/generate';

    const userId = `dl_${randomUUID()}`;
    // userId must start with `dl_`
    const options2 = {
      // uri: 'https://botport.ngrok.io/.bot/v3/directline/tokens/generate',
      uri: URI,
      headers: {
        Authorization: 'Bearer RpWRRz6-eUo.Okmfx_Wx1BnJT2dH0lH5bqPPNI6ZD03SKyeuVhEyQqE',
      },
      json: {
        User: {
          Id: userId,
        },
      },
    };

    await request.post(options2, (error, response, body) => {
      log('BODYYY ', body);
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

module.exports = directLineAseRouter;

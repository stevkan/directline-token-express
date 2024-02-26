const request = require('request');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const log = require('console').log;

const speechServicesRouter = (corsOptions) => {
  return router.post('/speechservices/token', cors(corsOptions), async (req, res) => {
    const options = {
      // method: 'POST',
      uri: `https://${process.env.SPEECH_SERVICES_REGION}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.SPEECH_SERVICES_SUBSCRIPTION_KEY,
      },
    };
    request.post(options, (error, response, body) => {
      if (!error && response.statusCode <= 399) {
        res.send({
          token: body,
          region: process.env.SPEECH_SERVICES_REGION,
        });
        log(`Someone requested a speech token...(${response.statusCode})`);
      } else if (response.statusCode >= 400 && response.statusCode < 500)
        res.send({
          statusCode: response.statusCode,
          error: "CS's speech token API returned error",
        });
      else if (response.statusCode >= 500) {
        res.status(response.statusCode);
        res.send({
          statusCode: response.statusCode,
          error: "CS's speech token API couldn't be reached",
        });
      }
    });
  });
};

module.exports = speechServicesRouter;

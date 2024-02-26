const request = require('request');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const log = require('console').log;

const githubWebhookRouter = (corsOptions) => {
  return router.post('/github/webhook', async (req, res) => {
    log(req.body);
    res.send('received');
    res.status(200);
    // const options = {
    //     uri: `https://${ process.env.SPEECH_SERVICES_REGION }.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
    //     headers: {
    //         'Ocp-Apim-Subscription-Key': process.env.SPEECH_SERVICES_SUBSCRIPTION_KEY
    //     }
    // };
    // request.post(options, (error, response, body) => {
    //     if (!error && response.statusCode <= 399) {
    //         body = { region: process.env.SPEECH_SERVICES_REGION, authorizationToken: body };
    //         res.send({
    //             authorizationToken: body.authorizationToken,
    //             region: body.region
    //         });
    //         logger(`Someone requested a speech token...(${ response.statusCode })`);
    //     } else if (response.statusCode >= 400 && response.statusCode < 500) {
    //         res.send({ statusCode: response.statusCode, error: "CS's speech token API returned error" });
    //     } else if (response.statusCode >= 500) {
    //         res.status(response.statusCode);
    //         res.send({ statusCode: response.statusCode, error: "CS's speech token API couldn't be reached" });
    //     }
    // });
  });
};

module.exports = githubWebhookRouter;

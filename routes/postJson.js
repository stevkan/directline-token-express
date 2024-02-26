const request = require('request');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const log = require('console').log;

const postJsonRouter = (corsOptions) => {
  return router.post('/data/json', cors(corsOptions), async (req, res) => {
    const { body } = req;
    log(body);
    const query = req.getQuery().replace('p=', '');
    res.send(body);
    res.status(200);
  });
};

module.exports = postJsonRouter;

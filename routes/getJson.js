const request = require('request');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const log = require('console').log;

const getJsonRouter = (corsOptions) => {
  return router.get('/data/json', cors(corsOptions), async (req, res) => {
    const body = [{ 1: 'Red' }, { 2: 'Blue' }, { 3: 'Green' }];
    log(req);
    // const query = req.query.replace('p=', '');
    res.send(body);
    res.status(200);
  });
};

module.exports = getJsonRouter;

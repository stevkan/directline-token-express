const conversationsRouter = require('./conversations');
const directLineAseRefresh = require('./directLineAseRefresh');
const directLineAseRouter = require('./generateDirectLineAseToken');
const directLineRouter = require('./generateDirectLineToken');
const getJsonRouter = require('./getJson');
const githubWebhookRouter = require('./githubWebhook');
const historyRouter = require('./history');
const postJsonRouter = require('./postJson');
const reconnectRouter = require('./reconnect');
const refreshRouter = require('./refresh');
const speechServicesRouter = require('./speechServices');
const webchatRouter = require('./generateWebChatToken');

module.exports = {
  conversationsRouter,
  directLineAseRefresh,
  directLineAseRouter,
  directLineRouter,
  getJsonRouter,
  githubWebhookRouter,
  historyRouter,
  postJsonRouter,
  refreshRouter,
  reconnectRouter,
  speechServicesRouter,
  webchatRouter,
};

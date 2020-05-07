const express = require('express');
const SessionController = require('./controllers/SessionsController');
const ChaptersController = require('./controllers/ChaptersController');
const PositionsController = require('./controllers/PositionsController');
const SubPositionsController = require('./controllers/SubPositionsController');
const ItemController = require('./controllers/ItemController');
const SubItemController = require('./controllers/SubItemController');
const CestController = require('./controllers/CestController');
const ncmController = require('./controllers/ncmController');

const routes = express.Router();

//routes of sessions
routes.get('/sessions', SessionController.list);
routes.get('/sessions/:id', SessionController.show);
routes.post('/sessions', SessionController.create);
routes.put('/sessions/:id', SessionController.update);
routes.delete('/sessions/:id', SessionController.delete);

//routes of chapters
routes.get('/chapters', ChaptersController.list);
routes.get('/chapters/:id', ChaptersController.show);
routes.post('/chapters', ChaptersController.create);
routes.put('/chapters/:id', ChaptersController.update);
routes.delete('/chapters/:id', ChaptersController.delete);

//routers of Positions
routes.get('/positions', PositionsController.list);
routes.get('/positions/:id', PositionsController.show);
routes.post('/positions', PositionsController.create);
routes.put('/positions/:id', PositionsController.update);
routes.delete('/positions/:id', PositionsController.delete)

//routers of Subpositions
routes.get('/subpositions', SubPositionsController.list);
routes.get('/subpositions/:id', SubPositionsController.show);
routes.post('/subpositions', SubPositionsController.create);
routes.put('/subpositions/:id', SubPositionsController.update);
routes.delete('/subpositions/:id', SubPositionsController.delete)

//routers of itens
routes.get('/item', ItemController.list);
routes.get('/item/:id', ItemController.show);
routes.post('/item', ItemController.create);
routes.put('/item/:id', ItemController.update);
routes.delete('/item/:id', ItemController.delete)

//routers of subitem
routes.get('/subitem', SubItemController.list);
routes.get('/subitem/:id', SubItemController.show);
routes.post('/subitem', SubItemController.create);
routes.put('/subitem/:id', SubItemController.update);
routes.delete('/subitem/:id', SubItemController.delete)

//routers of CEST
routes.get('/cest', CestController.list);
routes.get('/cest/:id', CestController.show);
routes.post('/cest', CestController.create);
routes.put('/cest/:id', CestController.update);
routes.delete('/cest/:id', CestController.delete);

//routres of NCM
routes.get('/ncm', ncmController.list);

module.exports = routes;
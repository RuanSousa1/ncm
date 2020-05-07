const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const routes = require('./router');

app.use(bodyParser({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(3001);
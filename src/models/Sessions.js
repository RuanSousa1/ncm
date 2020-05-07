const Sequelize = require('sequelize');
const sequelize = require('../db');

const schema = 'public';

class Sessions extends Sequelize.Model { }
Sessions.init({
    description: Sequelize.STRING
}, { sequelize, modelName: 'sessions', schema });

sequelize.sync();
module.exports = Sessions;

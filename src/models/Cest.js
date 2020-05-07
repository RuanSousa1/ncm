const Sequelize = require('sequelize');
const sequelize = require('../db');

const schemas = 'public';

class Cest extends Sequelize.Model { }
Cest.init(
    {
        description: Sequelize.STRING,
        code: Sequelize.STRING,
        ncm: Sequelize.STRING
    }, { sequelize, modelName: 'Cest', schemas }
);

sequelize.sync();

module.exports = Cest;

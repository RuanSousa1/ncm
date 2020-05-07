const Sequelize = require('sequelize');
const sequelize = require('../db');
const sessions = require('./sessions');

const schema = 'public';

class chapters extends Sequelize.Model { }
chapters.init(
    {
        description: Sequelize.STRING,
        code: Sequelize.STRING
    }, { sequelize, modelName: 'chapters', schema }
);

chapters.belongsTo(sessions, { as: 'sessions', foreignKey: 'sessionId' });//relacionamento

sequelize.sync();
module.exports = chapters;



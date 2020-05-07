const Sequelize = require('sequelize');
const sequelize = require('../db');
const Chapter = require('./Chapters');

const schemas = 'public';

class Positions extends Sequelize.Model { }
Positions.init(
    {
        description: Sequelize.STRING,
        code: Sequelize.STRING
    }, { sequelize, modelName: 'positions', schemas }
);

Positions.belongsTo(Chapter, { as: 'chapter', foreignKey: 'chapterId' });
sequelize.sync();

module.exports = Positions;
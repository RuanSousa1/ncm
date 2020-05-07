const Sequelize = require('sequelize');
const sequelize = require('../db');
const Position = require('./Positions');
const Schemas = 'public';

class SubPositions extends Sequelize.Model { }
SubPositions.init({
    description: Sequelize.STRING,
    code: Sequelize.STRING
}, { sequelize, modelName: 'SubPositions', Schemas }
);

SubPositions.belongsTo(Position, { as: 'positions', foreignKey: 'positionId' });

sequelize.sync();

module.exports = SubPositions;
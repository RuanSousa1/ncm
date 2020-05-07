const Sequelize = require('sequelize');
const sequelize = require('../db');
const schemas = 'public';
const SubPosition = require('../models/SubPositions');

class Item extends Sequelize.Model { }
Item.init({
    description: Sequelize.STRING,
    code: Sequelize.STRING
}, { sequelize, modelName: 'item', schemas }
);

Item.belongsTo(SubPosition, { as: 'SubPosition', foreignKey: 'SubPositionId' });

sequelize.sync();

module.exports = Item;


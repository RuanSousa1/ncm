const Sequelize = require('sequelize');
const sequelize = require('../db');
const schemas = 'public';
const Item = require('../models/Item');

class SubItem extends Sequelize.Model { }
SubItem.init({
    description: Sequelize.STRING,
    code: Sequelize.STRING,
    startDate: Sequelize.DATE,
    endDate: Sequelize.DATE,
    unidTrib: Sequelize.STRING,
    newNcm: Sequelize.STRING,
    version: Sequelize.INTEGER
}, { sequelize, modelName: 'SubItem', schemas }
);

SubItem.belongsTo(Item, { as: 'item', foreignKey: 'itemId' });

sequelize.sync();

module.exports = SubItem;
const Sequelize = require('sequelize');
const sequelize = new Sequelize('NCM2', 'postgres', 'rsb123', {
    host: 'localhost',
    dialect: 'postgres'
}
);
module.exports = sequelize;
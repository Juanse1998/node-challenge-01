const { Sequelize } = require('sequelize');
const environment = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[environment];


const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
});

module.exports = sequelize;

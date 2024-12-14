const { Sequelize } = require('sequelize');

const environment = process.env.NODE_ENV || 'development';
const config = require('./config.json'); 
const dbConfig = config[environment];


const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      logging: console.log, 
});

module.exports = sequelize

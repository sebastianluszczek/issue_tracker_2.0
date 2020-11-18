const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  config.db_name,
  config.db_user,
  config.db_pass,
  {
    host: config.db_host,
    dialect: config.db_dialect,
    operatorsAliases: Sequelize.Op,
    logging: false,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.issues = require('./issue.model.js')(sequelize, Sequelize);

module.exports = db;

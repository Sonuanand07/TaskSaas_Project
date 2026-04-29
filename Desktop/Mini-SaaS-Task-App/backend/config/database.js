const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'dev.sqlite',
  logging: process.env.NODE_ENV === 'production' ? false : console.log,
});

module.exports = sequelize;


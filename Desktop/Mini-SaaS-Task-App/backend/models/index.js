const { sequelize } = require('../config/database');
const User = require('./User');
const Task = require('./Task');

User.associate({ User, Task });
Task.associate({ User, Task });

module.exports = { sequelize, User, Task };


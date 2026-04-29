const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed'),
    defaultValue: 'pending',
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Task.associate = (models) => {
  Task.belongsTo(models.User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
};

module.exports = Task;


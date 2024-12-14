'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    static associate(models) {
      // A log belongs to a user
      Log.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  Log.init(
    {
      event: DataTypes.TEXT,
      user_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Log',
      tableName: 'logs',
      timestamps: true,
    }
  );

  return Log;
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      // A service belongs to a room
      Service.belongsTo(models.Room, { foreignKey: 'room_id' });

      // A service can have many comments
      Service.hasMany(models.ServiceComment, { foreignKey: 'service_id' });
    }
  }

  Service.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      rating: DataTypes.FLOAT,
      balance: DataTypes.FLOAT,
      amount: DataTypes.INTEGER,
      type: DataTypes.ENUM('card', 'trainer', 'exercise'),
      room_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Service',
      tableName: 'services',
      timestamps: true,
    }
  );

  return Service;
};

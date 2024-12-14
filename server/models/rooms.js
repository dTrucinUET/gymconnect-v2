'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      // A room belongs to a user (owner)
      Room.belongsTo(models.User, { foreignKey: 'owner_id' });

      // A room can have many equipment
      Room.hasMany(models.Equipment, { foreignKey: 'room_id' });

      // A room can have many service
      Room.hasMany(models.Service, { foreignKey: 'room_id' });

      // A room can have many comments
      Room.hasMany(models.RoomComment, { foreignKey: 'room_id' });
    }
  }

  Room.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      location: DataTypes.JSON,
      rating: DataTypes.FLOAT,
      owner_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Room',
      tableName: 'rooms',
      timestamps: true,
    }
  );

  return Room;
};

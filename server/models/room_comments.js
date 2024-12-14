'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RoomComment extends Model {
    static associate(models) {
      // A room comment belongs to a room
      RoomComment.belongsTo(models.Room, { foreignKey: 'room_id' });
    }
  }

  RoomComment.init(
    {
      comment: DataTypes.TEXT,
      images_url: DataTypes.JSON,
      rating: DataTypes.FLOAT,
      room_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'RoomComment',
      tableName: 'room_comments',
      timestamps: true,
    }
  );

  return RoomComment;
};

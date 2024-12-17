'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRoom extends Model {
    static associate(models) {
      UserRoom.belongsTo(models.User, { foreignKey: 'role_id' });
      UserRoom.belongsTo(models.Room, { foreignKey: 'permission_id' });
    }
  }

  UserRoom.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      room_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'rooms',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'UserRoom',
      tableName: 'user_room',
      timestamps: true,
    }
  );

  return UserRoom;
};

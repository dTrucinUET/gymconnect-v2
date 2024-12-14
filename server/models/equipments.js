'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    static associate(models) {
      // An equipment belongs to a room
      Equipment.belongsTo(models.Room, { foreignKey: 'room_id' });

      // An equipment can have many comments
      Equipment.hasMany(models.EquipmentComment, { foreignKey: 'equipment_id' });
    }
  }

  Equipment.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      rating: DataTypes.FLOAT,
      amount: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Equipment',
      tableName: 'equipments',
      timestamps: true,
    }
  );

  return Equipment;
};

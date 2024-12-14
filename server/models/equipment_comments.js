'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EquipmentComment extends Model {
    static associate(models) {
      // An equipment comment belongs to an equipment
      EquipmentComment.belongsTo(models.Equipment, { foreignKey: 'equipment_id' });
    }
  }

  EquipmentComment.init(
    {
      comment: DataTypes.TEXT,
      images_url: DataTypes.JSON,
      rating: DataTypes.FLOAT,
      equipment_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'EquipmentComment',
      tableName: 'equipment_comments',
      timestamps: true,
    }
  );

  return EquipmentComment;
};

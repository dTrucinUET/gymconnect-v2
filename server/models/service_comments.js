'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ServiceComment extends Model {
    static associate(models) {
      // A service comment belongs to a service
      ServiceComment.belongsTo(models.Service, { foreignKey: 'service_id' });
    }
  }

  ServiceComment.init(
    {
      comment: DataTypes.TEXT,
      images_url: DataTypes.JSON,
      rating: DataTypes.FLOAT,
      service_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'ServiceComment',
      tableName: 'service_comments',
      timestamps: true,
    }
  );

  return ServiceComment;
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate(models) {
      // A permission can belong to many roles
      Permission.belongsToMany(models.Role, {
        through: 'role_permission',
        foreignKey: 'permission_id',
        otherKey: 'role_id',
      });
    }
  }

  Permission.init(
    {
      permission: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Permission',
      tableName: 'permissions',
      timestamps: true,
    }
  );

  return Permission;
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    static associate(models) {
      RolePermission.belongsTo(models.Role, { foreignKey: 'role_id' });
      RolePermission.belongsTo(models.Permission, { foreignKey: 'permission_id' });
    }
  }

  RolePermission.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      permission_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'permissions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'RolePermission',
      tableName: 'role_permission',
      timestamps: true,
    }
  );

  return RolePermission;
};

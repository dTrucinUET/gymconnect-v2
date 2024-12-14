'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // A role can have many users
      Role.belongsToMany(models.User, {
        through: 'user_role',
        foreignKey: 'role_id',
        otherKey: 'user_id',
      });

      // A role can have many permissions
      Role.belongsToMany(models.Permission, {
        through: 'role_permission',
        foreignKey: 'role_id',
        otherKey: 'permission_id',
      });
    }
  }

  Role.init(
    {
      role_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
      timestamps: true,
    }
  );

  return Role;
};

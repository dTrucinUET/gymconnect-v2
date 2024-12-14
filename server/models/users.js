'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // A user can have many roles
      User.belongsToMany(models.Role, {
        through: 'user_role',
        foreignKey: 'user_id',
        otherKey: 'role_id',
      });

      // A user can have many rooms
      User.hasMany(models.Room, { foreignKey: 'owner_id' });

      // A user can make many transactions
      User.hasMany(models.Transaction, { foreignKey: 'user_id' });

      // A user can create many logs
      User.hasMany(models.Log, { foreignKey: 'user_id' });
    }
  }

  User.init(
    {
      username: { type: DataTypes.STRING, unique: true },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      description: { type: DataTypes.STRING, allowNull: true },
      phone_number: { type: DataTypes.STRING, allowNull: true },
      email: { type: DataTypes.STRING, unique: true },
      address: { type: DataTypes.JSON, allowNull: true },
      dob: { type: DataTypes.DATEONLY, allowNull: true },
      avatar_url: { type: DataTypes.STRING, allowNull: true },
      location: { type: DataTypes.JSON, allowNull: false },
      balance: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    }
  );

  return User;
};

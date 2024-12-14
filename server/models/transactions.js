'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // A transaction belongs to a user
      Transaction.belongsTo(models.User, { foreignKey: 'user_id' });

      // A transaction belongs to a service
      Transaction.belongsTo(models.Service, { foreignKey: 'service_id' });

      // A transaction can have many logs
      Transaction.hasMany(models.TransactionLog, { foreignKey: 'transaction_id' });
    }
  }

  Transaction.init(
    {
      status: DataTypes.ENUM('pending', 'failed', 'completed'),
      user_id: DataTypes.INTEGER,
      service_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'transactions',
      timestamps: true,
    }
  );

  return Transaction;
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TransactionLog extends Model {
    static associate(models) {
      // A transaction log belongs to a transaction
      TransactionLog.belongsTo(models.Transaction, { foreignKey: 'transaction_id' });
    }
  }

  TransactionLog.init(
    {
      event: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'TransactionLog',
      tableName: 'transaction_logs',
      timestamps: true,
    }
  );

  return TransactionLog;
};

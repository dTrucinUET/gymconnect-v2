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
      transaction_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'TransactionLog',
      tableName: 'transactionLogs',
      timestamps: true,
    }
  );

  return TransactionLog;
};

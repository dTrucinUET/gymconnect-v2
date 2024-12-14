// var DataTypes = require("sequelize").DataTypes;
// var _SequelizeMeta = require("./SequelizeMeta");
// var _equipment_comments = require("./equipment_comments");
// var _equipments = require("./equipments");
// var _logs = require("./logs");
// var _permissions = require("./permissions");
// var _role_permission = require("./role_permission");
// var _roles = require("./roles");
// var _room_comments = require("./room_comments");
// var _rooms = require("./rooms");
// var _service_comments = require("./service_comments");
// var _services = require("./services");
// var _transactionLogs = require("./transactionLogs");
// var _transactions = require("./transactions");
// var _users = require("./users");

// function initModels(sequelize) {
//   var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
//   var equipment_comments = _equipment_comments(sequelize, DataTypes);
//   var equipments = _equipments(sequelize, DataTypes);
//   var logs = _logs(sequelize, DataTypes);
//   var permissions = _permissions(sequelize, DataTypes);
//   var role_permission = _role_permission(sequelize, DataTypes);
//   var roles = _roles(sequelize, DataTypes);
//   var room_comments = _room_comments(sequelize, DataTypes);
//   var rooms = _rooms(sequelize, DataTypes);
//   var service_comments = _service_comments(sequelize, DataTypes);
//   var services = _services(sequelize, DataTypes);
//   var transactionLogs = _transactionLogs(sequelize, DataTypes);
//   var transactions = _transactions(sequelize, DataTypes);
//   var users = _users(sequelize, DataTypes);

//   equipment_comments.belongsTo(equipments, { as: "equipment", foreignKey: "equipment_id"});
//   equipments.hasMany(equipment_comments, { as: "equipment_comments", foreignKey: "equipment_id"});
//   role_permission.belongsTo(permissions, { as: "permission", foreignKey: "permission_id"});
//   permissions.hasMany(role_permission, { as: "role_permissions", foreignKey: "permission_id"});
//   role_permission.belongsTo(roles, { as: "role", foreignKey: "role_id"});
//   roles.hasMany(role_permission, { as: "role_permissions", foreignKey: "role_id"});
//   users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
//   roles.hasMany(users, { as: "users", foreignKey: "role_id"});
//   equipments.belongsTo(rooms, { as: "room", foreignKey: "room_id"});
//   rooms.hasMany(equipments, { as: "equipments", foreignKey: "room_id"});
//   room_comments.belongsTo(rooms, { as: "room", foreignKey: "room_id"});
//   rooms.hasMany(room_comments, { as: "room_comments", foreignKey: "room_id"});
//   services.belongsTo(rooms, { as: "room", foreignKey: "room_id"});
//   rooms.hasMany(services, { as: "services", foreignKey: "room_id"});
//   service_comments.belongsTo(services, { as: "service", foreignKey: "service_id"});
//   services.hasMany(service_comments, { as: "service_comments", foreignKey: "service_id"});
//   transactions.belongsTo(services, { as: "service", foreignKey: "service_id"});
//   services.hasMany(transactions, { as: "transactions", foreignKey: "service_id"});
//   transactionLogs.belongsTo(transactions, { as: "transaction", foreignKey: "transaction_id"});
//   transactions.hasMany(transactionLogs, { as: "transactionLogs", foreignKey: "transaction_id"});
//   logs.belongsTo(users, { as: "user", foreignKey: "user_id"});
//   users.hasMany(logs, { as: "logs", foreignKey: "user_id"});
//   rooms.belongsTo(users, { as: "owner", foreignKey: "owner_id"});
//   users.hasMany(rooms, { as: "rooms", foreignKey: "owner_id"});
//   transactions.belongsTo(users, { as: "user", foreignKey: "user_id"});
//   users.hasMany(transactions, { as: "transactions", foreignKey: "user_id"});

//   return {
//     SequelizeMeta,
//     equipment_comments,
//     equipments,
//     logs,
//     permissions,
//     role_permission,
//     roles,
//     room_comments,
//     rooms,
//     service_comments,
//     services,
//     transactionLogs,
//     transactions,
//     users,
//   };
// }
// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;

const { Sequelize } = require('sequelize');
const path = require('path');
const config = require('./config/config.json'); 
const environment = process.env.NODE_ENV || 'development';

const dbConfig = config[environment];

const migrations = [
    '20241213022009-create-roles.js',
    '20241213023027-create-users.js',
    '20241213022014-create-permissions.js',
    '20241213022018-create-role-permission.js',
    '20241213022022-create-rooms.js',
    '20241213022027-create-room-comments.js',
    '20241213022032-create-equipments.js',
    '20241213022036-create-equipment-comments.js',
    '20241213022040-create-services.js',
    '20241213022045-create-service-comments.js',
    '20241213022049-create-transactions.js',
    '20241213022054-create-transaction-logs.js',
    '20241213022058-create-logs.js',

  ];
  

  (async () => {
    const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      logging: console.log, 
    });

  
    try {
      for (const migration of migrations) {
        const migrationPath = path.join(__dirname, 'migrations', migration);
        console.log(`Running migration: ${migration}`);
        const migrationModule = require(migrationPath);
        await migrationModule.up(sequelize.getQueryInterface(), Sequelize);
      }
      console.log('Migrations completed successfully.');
    } catch (error) {
      console.error('Error running migrations:', error);
    } finally {
      await sequelize.close();
    }
  })();

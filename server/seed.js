const { Sequelize } = require('sequelize');
const path = require('path');
const config = require('./config/config.json'); 
const environment = process.env.NODE_ENV || 'development';

const dbConfig = config[environment];

const seeds = [
    'demo-permision.js',
    'demo-role.js',
    'demo-rolePermission.js',  
    'demo-users.js',
    'demo-userRoom.js',
    'demo-equip.js',
    'demo-room.js',
    'demo-services.js',
    'demo-transiction.js',
    'demo-equipcomment.js',
    'demo-logs.js',
    'demo-roomComment.js',
    'demo-servicesComment.js',
    'demo-transictionLogs.js',
  ];
  

  (async () => {
    const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      logging: console.log, 
    });

  
    try {
      for (const seed of seeds) {
        const seedPath = path.join(__dirname, 'seeders', seed);
        // console.log(seedPath);
        console.log(`Running seed\: ${seed}`);
        const seedModule = require(seedPath);
        console.log(seedModule);
        
        await seedModule.up(sequelize.getQueryInterface(), Sequelize);
      }
      console.log('seeds completed successfully.');
    } catch (error) {
      console.error('Error running seeds:', error);
    } finally {
      await sequelize.close();
    }
  })();

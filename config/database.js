const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({ path: `${process.cwd()}/.env` });

const env = process.env.NODE_ENV || 'development';
const config = require('./config');
console.log(config[env])
console.log(config[env].DB_HOST);
const sequelize = new Sequelize(config[env].database, config[env].username, config[env].password, {
  host: config[env].host,
  port: config[env].port,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // This will ensure SSL is used
      rejectUnauthorized: false, // For self-signed certificates. Set to true in production with valid certs
    },
  },
  // Optional: Additional Sequelize options
  logging: false, // Disable logging; enable if needed
});

module.exports = sequelize;

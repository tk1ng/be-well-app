require('dotenv').config();

const Sequelize = require('sequelize');

const { REACT_APP_CONNECTION_URI } = process.env;

const sequelize = new Sequelize(REACT_APP_CONNECTION_URI, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = sequelize;
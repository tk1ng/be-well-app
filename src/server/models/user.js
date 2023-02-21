const { DataTypes } = require('sequelize');

const sequelize = require('../utils/database');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    birthdate: {
        type: DataTypes.DATEONLY
    },
})

module.exports = User;
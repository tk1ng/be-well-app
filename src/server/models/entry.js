const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Entry = sequelize.define('entry', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING
    }
});

module.exports = Entry;
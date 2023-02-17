const { DataTypes } = require('sequelize');

const sequelize = require('../util/database');

const Wellness_score = sequelize.define('wellness_score', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    score: {
        type: DataTypes.STRING
    },
    stress_level: {
        type: DataTypes.INTEGER
    }
});

module.exports = Wellness_score;
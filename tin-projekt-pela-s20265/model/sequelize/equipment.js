const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Equipment = sequelize.define('Equipment', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING(12),
        allowNull: false
    },
    size: {
        type: Sequelize.DECIMAL(3, 1),
        allowNull: false
    },
    purpose: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
});

module.exports = Equipment;

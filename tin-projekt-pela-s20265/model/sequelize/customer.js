const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Customer = sequelize.define('Customer', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    phoneNo: {
        type: Sequelize.STRING(9),
        allowNull: false,
        unique: true
    }
});

module.exports = Customer;

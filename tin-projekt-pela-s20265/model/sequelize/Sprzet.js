const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Sprzet = sequelize.define('Sprzet', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    rozmiar: {
        type: Sequelize.DECIMAL(3, 1),
        allowNull: false
    },
    przeznaczenie: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
});

module.exports = Sprzet;
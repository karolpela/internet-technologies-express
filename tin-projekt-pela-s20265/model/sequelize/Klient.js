const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Klient = sequelize.define('Klient', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    imie: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    nazwisko: {
        type: Sequelize.STRING(40),
        allowNull: false
    },
    nrTelefonu: {
        type: Sequelize.STRING(9),
        allowNull: false,
        unique: true
    }
});

module.exports = Klient;
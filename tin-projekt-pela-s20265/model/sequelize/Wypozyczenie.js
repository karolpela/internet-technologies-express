const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Wypozyczenie = sequelize.define('Wypozyczenie', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_klient: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_sprzet: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    data_wypozyczenia: {
        type: Sequelize.DATE,
        allowNull: false
    },
    data_zwrotu: {
        type: Sequelize.DATE,
        allowNull: true
    }
});

module.exports = Wypozyczenie;
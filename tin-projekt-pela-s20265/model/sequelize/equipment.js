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
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Pole jest wymagane'
            },
            len: {
                args: [2, 12],
                msg: 'Pole powinno zawierać od 2 do 12 znaków'
            }
        }
    },
    size: {
        type: Sequelize.DECIMAL(3, 1),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Pole jest wymagane'
            },
            is: {
                args: /^[1-9][0-9](\.[5])?$/,
                msg: 'Pole powinno zawierać rozmiar w formacie np. 40 lub 40.5'
            }
        }
    },
    purpose: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Pole jest wymagane'
            },
            len: {
                args: [2, 20],
                msg: 'Pole powinno zawierać od 2 do 20 znaków'
            }
        }
    }
});

module.exports = Equipment;

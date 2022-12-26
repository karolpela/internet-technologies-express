const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Rental = sequelize.define('Rental', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Pole jest wymagane'
            },
            isInt: {
                args: true,
                msg: 'Pole powinno zawierać liczbę całkowitą'
            }
        }
    },
    equipmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Pole jest wymagane'
            },
            isInt: {
                args: true,
                msg: 'Pole powinno zawierać liczbę całkowitą'
            }
        }
    },
    startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Pole jest wymagane'
            },
            isDate: {
                args: true,
                msg: 'Pole powinno zawierać datę'
            }
        }
    },
    endDate: {
        //TODO sprawdzić czy nie jest wcześniejsza od daty zwrotu
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'Pole jest wymagane'
            },
            isDate: {
                args: true,
                msg: 'Pole powinno zawierać datę'
            }
        }
    }
});

module.exports = Rental;

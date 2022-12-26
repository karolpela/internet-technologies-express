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
    },
    lastName: {
        type: Sequelize.STRING(40),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Pole jest wymagane'
            },
            len: {
                args: [2, 40],
                msg: 'Pole powinno zawierać od 2 do 40 znaków'
            }
        }
    },
    phoneNo: {
        type: Sequelize.STRING(9),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Pole jest wymagane'
            },
            is: {
                args: /^\d{9}$/,
                msg: 'Pole powinno zawierać dokładnie 9 cyfr'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Customer;

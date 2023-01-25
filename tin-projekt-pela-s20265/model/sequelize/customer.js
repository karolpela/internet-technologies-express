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
                msg: 'notEmpty'
            },
            len: {
                args: [2, 20],
                msg: 'len_2_20'
            }
        }
    },
    lastName: {
        type: Sequelize.STRING(40),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'notEmpty'
            },
            len: {
                args: [2, 40],
                msg: 'len_2_40'
            }
        }
    },
    phoneNo: {
        type: Sequelize.STRING(9),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'notEmpty'
            },
            is: {
                args: /^\d{9}$/,
                msg: 'isPhoneNo'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        default: '12345'
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'customer',
        validate: {
            isIn: {
                args: [['admin', 'employee', 'customer']],
                msg: 'isInRole'
            }
        }
    }
});

module.exports = Customer;

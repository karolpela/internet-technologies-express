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
                msg: 'notEmpty'
            },
            len: {
                args: [2, 12],
                msg: 'len_2_12'
            }
        }
    },
    size: {
        type: Sequelize.DECIMAL(3, 1),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'notEmpty'
            },
            is: {
                args: /^[1-9][0-9](\.[05])?$/,
                msg: 'isShoeSize'
            }
        }
    },
    purpose: {
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
    }
});

module.exports = Equipment;

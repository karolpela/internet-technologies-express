const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Repair = sequelize.define('Repair', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    serviceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'notEmpty'
            },
            isInt: {
                args: true,
                msg: 'isInteger'
            }
        }
    },
    employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'notEmpty'
            },
            isInt: {
                args: true,
                msg: 'isInteger'
            }
        }
    },
    problem: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'notEmpty'
            },
            len: {
                args: [2, 60],
                msg: 'len_2_60'
            }
        }
    },
    status: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'notEmpty'
            },
            isIn: [['zgłoszona', 'w trakcie', 'zakończona']]
        }
    }
});

module.exports = Repair;

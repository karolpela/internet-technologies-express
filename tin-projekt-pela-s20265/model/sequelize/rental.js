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
                msg: 'notEmpty'
            },
            isInt: {
                args: true,
                msg: 'isInteger'
            }
        }
    },
    equipmentId: {
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
    startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'notEmpty'
            },
            isDate: {
                args: true,
                msg: 'isDate'
            },
            notInFuture: function (startDate) {
                let nowDate = new Date(),
                    month = '' + (nowDate.getMonth() + 1),
                    day = '' + nowDate.getDate(),
                    year = nowDate.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                const nowString = [year, month, day].join('-');

                let nowDay = new Date(nowString);
                let startDay = new Date(startDate);
                if (startDay.getTime() > nowDay.getTime()) {
                    throw new Error('notInFuture');
                }
            }
        }
    },
    endDate: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: 'notEmpty'
            },
            isDate: {
                args: true,
                msg: 'isDate'
            },
            isAfterStartDate: function (endDate) {
                if (!endDate) return;
                if (this.startDate > endDate) {
                    throw new Error('isAfterStartDate');
                }
            }
        }
    }
});

module.exports = Rental;

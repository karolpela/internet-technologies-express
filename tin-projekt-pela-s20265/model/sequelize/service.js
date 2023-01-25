const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');
const { allowedTypes } = require('./serviceTypes');

const Service = sequelize.define('Service', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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
    type: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'notEmpty'
            },
            isIn: [allowedTypes]
        }
    },
    status: {
        //TODO show this
        type: Sequelize.VIRTUAL,
        get() {
            let repairs = this.repairs;
            if (!repairs) {
                return 'nowy';
            } else {
                repairs.forEach((repair) => {
                    if (repair.status === 'zgłoszona' || repair.status === 'w trakcie') {
                        return 'w trakcie';
                    }
                });
                return 'zakończony';
            }
        }
    }
});

module.exports = Service;

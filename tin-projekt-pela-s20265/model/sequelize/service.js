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
            }
            if (repairs.length === 0) {
                return 'nowy';
            } else {
                let unfinished = repairs.every(
                    (repair) =>
                        repair.dataValues.status === 'zgłoszona' ||
                        repair.dataValues.status === 'w trakcie'
                );
                return unfinished ? 'w trakcie' : 'zakończony';
            }
        }
    }
});

module.exports = Service;

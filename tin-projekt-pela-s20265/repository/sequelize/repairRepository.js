const Sequelize = require('sequelize');

const Customer = require('../../model/sequelize/customer');
const Equipment = require('../../model/sequelize/equipment');
const Repair = require('../../model/sequelize/repair');
const Service = require('../../model/sequelize/service');

exports.getRepairs = () => {
    return Repair.findAll({
        include: [
            {
                model: Customer,
                as: 'employee'
            },
            {
                model: Service,
                as: 'service'
            }
        ]
    });
};

exports.getRepairStatuses = () => {
    return ['zgłoszona', 'w trakcie', 'zakończona'];
};

exports.getRepairById = (repairId) => {
    return Repair.findByPk(repairId, {
        include: [
            {
                model: Customer,
                as: 'employee'
            },
            {
                model: Service,
                as: 'service'
            }
        ]
    });
};

exports.getEmployeeRepairById = (employeeId, repairId) => {
    return Repair.findOne({
        where: {
            _id: repairId,
            employeeId: employeeId
        },
        include: [
            {
                model: Customer,
                as: 'employee'
            },
            {
                model: Service,
                as: 'service'
            }
        ]
    });
};

exports.getRepairsByEmployee = (employeeId) => {
    return Repair.findAll({
        where: {
            employeeId: employeeId
        },
        include: [
            {
                model: Customer,
                as: 'employee'
            },
            {
                model: Service,
                as: 'service'
            }
        ]
    });
};

exports.getRepairsByService = (serviceId) => {
    return Repair.findAll({
        where: {
            serviceId: serviceId
        },
        include: [
            {
                model: Customer,
                as: 'customer'
            },
            {
                model: Service,
                as: 'service'
            }
        ]
    });
};

exports.createRepair = (newRepairData) => {
    console.log(JSON.stringify(newRepairData));
    return Repair.create({
        employeeId: newRepairData.employeeId,
        serviceId: newRepairData.serviceId,
        problem: newRepairData.problem,
        status: newRepairData.status
    });
};

exports.updateRepair = (repairId, newRepairData) => {
    return Repair.update(newRepairData, { where: { _id: repairId } });
};

exports.deleteRepair = (repairId) => {
    return Repair.destroy({
        where: { _id: repairId }
    });
};

exports.deleteManyRepairs = (repairIds) => {
    return Repair.find({ _id: { [Sequelize.Op.in]: repairIds } });
};

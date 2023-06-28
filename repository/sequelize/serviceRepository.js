const Sequelize = require('sequelize');

const Customer = require('../../model/sequelize/customer');
const Equipment = require('../../model/sequelize/equipment');
const Repair = require('../../model/sequelize/repair');
const Service = require('../../model/sequelize/service');
const { allowedTypes } = require('../../model/sequelize/serviceTypes');

exports.getServices = () => {
    return Service.findAll({
        include: [
            {
                model: Equipment,
                as: 'equipment'
            },
            {
                model: Repair,
                as: 'repairs'
            }
        ]
    });
};

exports.getServiceTypes = () => {
    return allowedTypes;
};

exports.getServiceById = (serviceId) => {
    return Service.findByPk(serviceId, {
        include: [
            {
                model: Equipment,
                as: 'equipment'
            },
            {
                model: Repair,
                as: 'repairs'
            }
        ]
    });
};

exports.createService = (newServiceData) => {
    console.log(JSON.stringify(newServiceData));
    return Service.create({
        equipmentId: newServiceData.equipmentId,
        type: newServiceData.type
    });
};

exports.updateService = (serviceId, newServiceData) => {
    return Service.update(newServiceData, { where: { _id: serviceId } });
};

exports.deleteService = (serviceId) => {
    return Service.destroy({
        where: { _id: serviceId }
    });
};

exports.deleteManyServices = (serviceIds) => {
    return Service.find({ _id: { [Sequelize.Op.in]: serviceIds } });
};

exports.getAllowedTypes = () => {
    let a = Service.allowedTypes;
    return a;
};

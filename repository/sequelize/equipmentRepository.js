const { Sequelize } = require('sequelize');
const isEmployee = require('../../middleware/isEmployee');
const Customer = require('../../model/sequelize/customer');
const Equipment = require('../../model/sequelize/equipment');
const Rental = require('../../model/sequelize/rental');

exports.getEquipment = () => {
    return Equipment.findAll();
};

exports.getEquipmentById = (customerId, equipmentId, userRole) => {
    if (userRole === 'employee' || userRole === 'admin') {
        return Equipment.findByPk(equipmentId, {
            include: [
                {
                    model: Rental,
                    as: 'rentals',
                    include: [
                        {
                            model: Customer,
                            as: 'customer'
                        }
                    ]
                }
            ]
        });
    } else {
        return Equipment.findByPk(equipmentId, {
            include: [
                {
                    model: Rental,
                    as: 'rentals',
                    include: [
                        {
                            model: Customer,
                            as: 'customer'
                        }
                    ],
                    where: {
                        customerId: customerId
                    },
                    required: false
                }
            ]
        });
    }
};

exports.createEquipment = (newEquipmentData) => {
    return Equipment.create({
        type: newEquipmentData.type,
        size: newEquipmentData.size,
        purpose: newEquipmentData.purpose
    });
};

exports.updateEquipment = (equipmentId, equipmentData) => {
    const type = equipmentData.type;
    const size = equipmentData.size;
    const purpose = equipmentData.purpose;
    return Equipment.update(equipmentData, { where: { _id: equipmentId } });
};

exports.deleteEquipment = (equipmentId) => {
    return Equipment.destroy({
        where: { _id: equipmentId }
    });
};

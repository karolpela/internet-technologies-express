const Customer = require('../../model/sequelize/customer');
const Equipment = require('../../model/sequelize/equipment');
const Rental = require('../../model/sequelize/rental');

exports.getEquipment = () => {
    return Equipment.findAll();
};

exports.getEquipmentById = (equipmentId) => {
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
};

exports.createEquipment = (newEquipmentData) => {
    return Equipment.create({
        size: newEquipmentData.size,
        purpose: newEquipmentData.purpose
    });
};

exports.updateEquipment = (equipmentId, equipmentData) => {
    const size = equipmentData.size;
    const purpose = equipmentData.purpose;
    return Equipment.update(equipmentData, { where: { _id: equipmentId } });
};

exports.deleteEquipment = (equipmentId) => {
    return Equipment.destroy({
        where: { _id: equipmentId }
    });
};

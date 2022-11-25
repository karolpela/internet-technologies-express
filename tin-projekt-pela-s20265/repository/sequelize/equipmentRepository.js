const Client = require('../../model/sequelize/client');
const Equipment = require('../../model/sequelize/equipment');
const Rental = require('../../model/sequelize/rental');

exports.getEquipments = () => {
    return Equipment.findAll();
}

exports.getEquipmentById = (equipmentId) => {
    return Equipment.findByPk(equipmentId,
        {
            include: [{
                model: Rental,
                as: 'rentals',
                include: [{
                    model: Client,
                    as: 'client'
                }]
            }]
        });
};

exports.createEquipment = (newEquipmentData) => {
    return Equipment.create({
        size: newEquipmentData.size,
        purpose: newEquipmentData.purpose
    })
}

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
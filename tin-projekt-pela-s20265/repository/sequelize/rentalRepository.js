const Sequelize = require('sequelize');

const Client = require('../../model/sequelize/client');
const Equipment = require('../../model/sequelize/equipment');
const Rental = require('../../model/sequelize/rental');

exports.getRentals = () => {
    return Rental.findAll({
        include: [
            {
                model: Client,
                as: 'client'
            },
            {
                model: Equipment,
                as: 'equipment'
            }
        ]
    })
}

exports.getRentalById = (rentalId) => {
    return Rental.findByPk(rentalId,
        {
            include: [
                {
                    model: Client,
                    as: 'client'
                },
                {
                    model: Equipment,
                    as: 'equipment'
                }
            ]
        });
};

exports.createRental = (data) => {
    console.log(JSON.stringify(data));
    return Rental.create({
        id_client: data.id_client,
        id_equipment: data.id_equipment,
        startDate: data.startDate,
        endDate: data.endDate
    });
};

exports.updateRental = (rentalId, data) => {
    return Rental.update(data, { where: { _id: rentalId } });
};

exports.deleteRental = (rentalId) => {
    return Rental.destroy({
        where: { _id: rentalId }
    });
};

exports.deleteManyRentals = (rentalIds) => {
    return Rental.find({ _id: { [Sequelize.Op.in]: rentalIds } });
};
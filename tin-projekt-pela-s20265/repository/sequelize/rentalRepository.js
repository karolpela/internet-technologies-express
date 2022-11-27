const Sequelize = require('sequelize');

const Customer = require('../../model/sequelize/customer');
const Equipment = require('../../model/sequelize/equipment');
const Rental = require('../../model/sequelize/rental');

exports.getRentals = () => {
    return Rental.findAll({
        include: [
            {
                model: Customer,
                as: 'customer'
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
                    model: Customer,
                    as: 'customer'
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
        id_customer: data.id_customer,
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
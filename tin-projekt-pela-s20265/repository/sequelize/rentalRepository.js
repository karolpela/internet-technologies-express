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
    });
};

exports.getRentalById = (rentalId) => {
    return Rental.findByPk(rentalId, {
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

exports.getCustomerRentalById = (customerId, rentalId) => {
    return Rental.findOne({
        where: {
            _id: rentalId,
            customerId: customerId
        },
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

exports.getRentalsByCustomer = (customerId) => {
    return Rental.findAll({
        where: {
            customerId: customerId
        },
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

exports.createRental = (newRentalData) => {
    console.log(JSON.stringify(newRentalData));
    if (newRentalData.endDate == '') newRentalData.endDate = null;
    return Rental.create({
        customerId: newRentalData.customerId,
        equipmentId: newRentalData.equipmentId,
        startDate: newRentalData.startDate,
        endDate: newRentalData.endDate
    });
};

exports.updateRental = (rentalId, newRentalData) => {
    if (newRentalData.endDate == '') newRentalData.endDate = null;
    return Rental.update(newRentalData, { where: { _id: rentalId } });
};

exports.deleteRental = (rentalId) => {
    return Rental.destroy({
        where: { _id: rentalId }
    });
};

exports.deleteManyRentals = (rentalIds) => {
    return Rental.find({ _id: { [Sequelize.Op.in]: rentalIds } });
};

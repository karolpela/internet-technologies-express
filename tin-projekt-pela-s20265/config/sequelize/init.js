const sequelize = require('./sequelize');

const Customer = require('../../model/sequelize/customer');
const Equipment = require('../../model/sequelize/equipment');
const Rental = require('../../model/sequelize/rental');

module.exports = () => {
    Customer.hasMany(Rental, {
        as: 'rentals',
        foreignKey: { name: 'customerId', allowNull: false },
        constraints: true,
        onDelete: 'CASCADE'
    });
    Rental.belongsTo(Customer, {
        as: 'customer',
        foreignKey: { name: 'customerId', allowNull: false }
    });
    Equipment.hasMany(Rental, {
        as: 'rentals',
        foreignKey: { name: 'equipmentId', allowNull: false },
        constraints: true,
        onDelete: 'CASCADE'
    });
    Rental.belongsTo(Equipment, {
        as: 'equipment',
        foreignKey: { name: 'equipmentId', allowNull: false }
    });

    let allCustomers, allEquipment;
    return sequelize
        .sync({ force: true })
        .then(() => {
            return Customer.findAll();
        })
        .then((customers) => {
            if (!customers || customers.length === 0) {
                return Customer.bulkCreate([
                    { firstName: 'Jan', lastName: 'Kowalski', phoneNo: '424144112' },
                    { firstName: 'Adam', lastName: 'Nowak', phoneNo: '312311551' },
                    { firstName: 'Marek', lastName: 'Szewczyk', phoneNo: '736731311' }
                ]).then(() => {
                    return Customer.findAll();
                });
            } else {
                return customers;
            }
        })
        .then((customers) => {
            allCustomers = customers;
            return Equipment.findAll();
        })
        .then((equipment) => {
            if (!equipment || equipment.length === 0) {
                return Equipment.bulkCreate([
                    { type: 'łyżwy', size: 39, purpose: 'hokejowe' },
                    { type: 'rolki', size: 42.5, purpose: 'figurowe' },
                    { type: 'wrotki', size: 40, purpose: 'wyścigowe' }
                ]).then(() => {
                    return Equipment.findAll();
                });
            } else {
                return equipment;
            }
        })
        .then((equipment) => {
            allEquipment = equipment;
            return Rental.findAll();
        })
        .then((rentals) => {
            if (!rentals || rentals.length === 0) {
                return Rental.bulkCreate([
                    {
                        customerId: allCustomers[0]._id,
                        equipmentId: allEquipment[0]._id,
                        startDate: '2022-09-03',
                        endDate: '2022-09-06'
                    },
                    {
                        customerId: allCustomers[1]._id,
                        equipmentId: allEquipment[1]._id,
                        startDate: '2022-10-14',
                        endDate: '2022-10-14'
                    },
                    {
                        customerId: allCustomers[2]._id,
                        equipmentId: allEquipment[0]._id,
                        startDate: '2022-11-19',
                        endDate: null
                    }
                ]);
            } else {
                return rentals;
            }
        });
};

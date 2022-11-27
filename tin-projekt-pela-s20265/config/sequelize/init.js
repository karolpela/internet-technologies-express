const sequelize = require('./sequelize');

const Customer = require('../../model/sequelize/customer');
const Equipment = require('../../model/sequelize/equipment');
const Rental = require('../../model/sequelize/rental');

module.exports = () => {
    Customer.hasMany(Rental, { as: 'rentals', foreignKey: { name: 'id_customer', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Rental.belongsTo(Customer, { as: 'customer', foreignKey: { name: 'id_customer', allowNull: false } });
    Equipment.hasMany(Rental, { as: 'rentals', foreignKey: { name: 'id_equipment', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Rental.belongsTo(Equipment, { as: 'equipment', foreignKey: { name: 'id_equipment', allowNull: false } });

    let allCustomers, allEquipment;
    return sequelize
        .sync({ force: true })
        .then(() => {
            return Customer.findAll();
        })
        .then(customers => {
            if (!customers || customers.length === 0) {
                return Customer.bulkCreate([
                    { firstName: 'Jan', lastName: 'Kowalski', phoneNo: '424144112' },
                    { firstName: 'Adam', lastName: 'Nowak', phoneNo: '312311551' },
                    { firstName: 'Marek', lastName: 'Szewczyk', phoneNo: '736731311' }
                ])
                    .then(() => {
                        return Customer.findAll();
                    });
            } else {
                return customers;
            }
        })
        .then(customers => {
            allCustomers = customers;
            return Equipment.findAll();
        })
        .then(equipment => {
            if (!equipment || equipment.length === 0) {
                return Equipment.bulkCreate([
                    { size: 39, purpose: 'hokejowe' },
                    { size: 42.5, purpose: 'figurowe' },
                    { size: 40, purpose: 'wyścigowe' },
                ])
                    .then(() => {
                        return Equipment.findAll();
                    })
            } else {
                return equipment;
            }
        })
        .then(equipment => {
            allEquipment = equipment;
            return Rental.findAll();
        })
        .then(rentals => {
            if (!rentals || rentals.length === 0) {
                return Rental.bulkCreate([
                    { id_customer: allCustomers[0]._id, id_equipment: allEquipment[0]._id, startDate: '2022-09-03', endDate: '2022-09-06' },
                    { id_customer: allCustomers[1]._id, id_equipment: allEquipment[1]._id, startDate: '2022-10-14', endDate: '2022-10-14' },
                    { id_customer: allCustomers[2]._id, id_equipment: allEquipment[0]._id, startDate: '2022-11-19', endDate: null }
                ]);
            } else {
                return rentals;
            }
        });
};
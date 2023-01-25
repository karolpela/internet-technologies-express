const sequelize = require('./sequelize');
const authUtil = require('../../util/authUtil');
const passHash = authUtil.hashPassword('12345');

const Customer = require('../../model/sequelize/customer');
const Equipment = require('../../model/sequelize/equipment');
const Rental = require('../../model/sequelize/rental');
const Service = require('../../model/sequelize/service');
const Repair = require('../../model/sequelize/repair');

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

    Equipment.hasMany(Service, {
        as: 'services',
        foreignKey: { name: 'equipmentId', allowNull: false },
        constraints: true,
        onDelete: 'CASCADE'
    });
    Service.belongsTo(Equipment, {
        as: 'equipment',
        foreignKey: { name: 'equipmentId', allowNull: false }
    });

    Service.hasMany(Repair, {
        as: 'repairs',
        foreignKey: { name: 'serviceId', allowNull: false },
        constraints: true,
        onDelete: 'CASCADE'
    });
    Repair.belongsTo(Service, {
        as: 'service',
        foreignKey: { name: 'serviceId', allowNull: false }
    });

    Repair.belongsTo(Customer, {
        // didn't update name -> only Employees should be assigned to repairs
        as: 'employee',
        foreignKey: { name: 'employeeId', allowNull: false }
    });
    Customer.hasMany(Repair, {
        as: 'repairs',
        foreignKey: { name: 'employeeId', allowNull: false },
        constraints: true,
        onDelete: 'CASCADE'
    });

    let allCustomers, allEquipment, allServices;
    return sequelize
        .sync({ force: true })
        .then(() => {
            return Customer.findAll();
        })
        .then((customers) => {
            if (!customers || customers.length === 0) {
                return Customer.bulkCreate([
                    {
                        firstName: 'Jan',
                        lastName: 'Kowalski',
                        phoneNo: '424144112',
                        password: passHash,
                        role: 'admin'
                    },
                    {
                        firstName: 'Adam',
                        lastName: 'Nowak',
                        phoneNo: '312311551',
                        password: passHash,
                        role: 'employee'
                    },
                    {
                        firstName: 'Marek',
                        lastName: 'Szewczyk',
                        phoneNo: '736731311',
                        password: passHash,
                        role: 'customer'
                    }
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
        })
        .then(() => {
            // allRentals variable is not needed
            return Service.findAll();
        })
        .then((services) => {
            if (!services || services.length === 0) {
                return Service.bulkCreate([
                    {
                        equipmentId: allEquipment[0]._id,
                        type: 'podstawowy'
                    },
                    {
                        equipmentId: allEquipment[1]._id,
                        type: 'rozszerzony'
                    },
                    {
                        equipmentId: allEquipment[0]._id,
                        type: 'pełny'
                    },
                    {
                        equipmentId: allEquipment[2]._id,
                        type: 'podstawowy'
                    }
                ]);
            } else {
                return services;
            }
        })
        .then((services) => {
            allServices = services;
            return Repair.findAll();
        })
        .then((repairs) => {
            if (!repairs || repairs.length === 0) {
                return Repair.bulkCreate([
                    {
                        serviceId: allServices[0]._id,
                        employeeId: 2,
                        problem: 'Płoza do wymiany',
                        status: 'zakonczona'
                    },
                    {
                        serviceId: allServices[1]._id,
                        employeeId: allCustomers[1]._id,
                        problem: 'Kółka do wymiany',
                        status: 'w trakcie'
                    },
                    {
                        serviceId: allServices[2]._id,
                        employeeId: allCustomers[1]._id,
                        problem: 'Łożyska do nasmarowania',
                        status: 'zgloszona'
                    }
                ]);
            } else {
                return repairs;
            }
        });
};

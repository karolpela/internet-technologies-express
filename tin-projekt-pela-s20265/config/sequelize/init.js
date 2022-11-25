const sequelize = require('./sequelize');

const Client = require('../../model/sequelize/client');
const Equipment = require('../../model/sequelize/equipment');
const Rental = require('../../model/sequelize/rental');

module.exports = () => {
    Client.hasMany(Rental, { as: 'rentals', foreignKey: { name: 'id_client', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Rental.belongsTo(Client, { as: 'client', foreignKey: { name: 'id_client', allowNull: false } });
    Equipment.hasMany(Rental, { as: 'rentals', foreignKey: { name: 'id_equipment', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Rental.belongsTo(Equipment, { as: 'equipment', foreignKey: { name: 'id_equipment', allowNull: false } });

    let allClients, allEquipment;
    return sequelize
        .sync({ force: true })
        .then(() => {
            return Client.findAll();
        })
        .then(clients => {
            if (!clients || clients.length === 0) {
                return Client.bulkCreate([
                    { firstName: 'Jan', lastName: 'Kowalski', phoneNo: '424144112' },
                    { firstName: 'Adam', lastName: 'Nowak', phoneNo: '312311551' },
                    { firstName: 'Marek', lastName: 'Szewczyk', phoneNo: '736731311' }
                ])
                    .then(() => {
                        return Client.findAll();
                    });
            } else {
                return clients;
            }
        })
        .then(clients => {
            allClients = clients;
            return Equipment.findAll();
        })
        .then(equipmenty => {
            if (!equipmenty || equipmenty.length === 0) {
                return Equipment.bulkCreate([
                    { size: 39, purpose: 'hokejowe' },
                    { size: 42.5, purpose: 'figurowe' },
                    { size: 40, purpose: 'wyścigowe' },
                ])
                    .then(() => {
                        return Equipment.findAll();
                    })
            } else {
                return equipmenty;
            }
        })
        .then(equipment => {
            allEquipment = equipment;
            return Rental.findAll();
        })
        .then(rentals => {
            if (!rentals || rentals.length === 0) {
                return Rental.bulkCreate([
                    { id_client: allClients[0]._id, id_equipment: allEquipment[0]._id, startDate: '2022-09-03', endDate: '2022-09-06' },
                    { id_client: allClients[1]._id, id_equipment: allEquipment[1]._id, startDate: '2022-10-14', endDate: '2022-10-14' },
                    { id_client: allClients[2]._id, id_equipment: allEquipment[0]._id, startDate: '2022-11-19', endDate: null }
                ]);
            } else {
                return rentals;
            }
        });
};
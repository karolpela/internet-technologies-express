const Client = require('../../model/sequelize/client');
const Equipment = require('../../model/sequelize/equipment');
const Rental = require('../../model/sequelize/rental');

exports.getClients = () => {
    return Client.findAll();
}

exports.getClientById = (clientId) => {
    return Client.findByPk(clientId,
        {
            include: [{
                model: Rental,
                as: 'rentals',
                include: [{
                    model: Equipment,
                    as: 'equipment'
                }]
            }]
        });
};

exports.createClient = (newClientData) => {
    return Client.create({
        firstName: newClientData.firstName,
        lastName: newClientData.lastName,
        phoneNo: newClientData.phoneNo,
    })
}

exports.updateClient = (clientId, clientData) => {

    const firstName = clientData.firstName;
    const lastName = clientData.lastName;
    const phoneNo = clientData.phoneNo;
    return Client.update(clientData, { where: { _id: clientId } });
};

exports.deleteClient = (clientId) => {
    return Client.destroy({
        where: { _id: clientId }
    });
};

const clientRepository = require('../repository/sequelize/clientRepository');

exports.getClients = (req, res, next) => {
    clientRepository.getClients()
        .then(clients => {
            res.status(200).json(clients);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getClientById = (req, res, next) => {
    const clientId = req.params.clientId;
    clientRepository.getClientById(clientId)
        .then(client => {
            if (!client) {
                res.status(404).json({
                    message: `Brak klienta z id ${clientId}`
                })
            } else {
                res.status(200).json(client);
            }

        });
};

exports.createClient = (req, res, next) => {
    clientRepository.createClient(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateClient = (req, res, next) => {
    const clientId = req.params.clientId;
    clientRepository.updateClient(clientId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Klient zaktualizowany', client: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.deleteClient = (req, res, next) => {
    const clientId = req.params.clientId;
    clientRepository.deleteClient(clientId)
        .then(result => {
            res.status(200).json({ message: 'Klient usuniety', client: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

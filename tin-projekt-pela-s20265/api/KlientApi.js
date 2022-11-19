/* eslint-disable no-unused-vars */
const KlientRepository = require('../repository/sequelize/KlientRepository');

exports.getKlients = (req, res, next) => {
    KlientRepository.getKlients()
        .then(klients => {
            res.status(200).json(klients);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getKlientById = (req, res, next) => {
    const klientId = req.params.klientId;
    KlientRepository.getKlientById(klientId)
        .then(klient => {
            if (!klient) {
                res.status(404).json({
                    message: `Brak klienta z id ${klientId}`
                })
            } else {
                res.status(200).json(klient);
            }

        });
};

exports.createKlient = (req, res, next) => {
    KlientRepository.createKlient(req.body)
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

exports.updateKlient = (req, res, next) => {
    const klientId = req.params.klientId;
    KlientRepository.updateKlient(klientId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Klient zaktualizowany!', klient: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.deleteKlient = (req, res, next) => {
    const klientId = req.params.klientId;
    KlientRepository.deleteKlient(klientId)
        .then(result => {
            res.status(200).json({ message: 'Klient usuniety', klient: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

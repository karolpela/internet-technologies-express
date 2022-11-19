/* eslint-disable no-unused-vars */
const WypozyczenieRepository = require('../repository/sequelize/WypozyczenieRepository');

exports.getWypozyczenia = (req, res, next) => {
    WypozyczenieRepository.getWypozyczenia()
        .then(wypozyczenia => {
            res.status(200).json(wypozyczenia);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getWypozyczenieById = (req, res, next) => {
    const wypozyczenieId = req.params.wypozyczenieId;
    WypozyczenieRepository.getWypozyczenieById(wypozyczenieId)
        .then(wypozyczenie => {
            if (!wypozyczenie) {
                res.status(404).json({
                    message: `Brak wypozyczenia z id ${wypozyczenieId}`
                })
            } else {
                res.status(200).json(wypozyczenie);
            }
        });
};

exports.createWypozyczenie = (req, res, next) => {
    WypozyczenieRepository.createWypozyczenie(req.body)
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

exports.updateWypozyczenie = (req, res, next) => {
    const wypozyczenieId = req.params.wypozyczenieId;
    WypozyczenieRepository.updateWypozyczenie(wypozyczenieId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Wypozyczenie zaktualizowane!', wypozyczenie: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.deleteWypozyczenie = (req, res, next) => {
    const wypozyczenieId = req.params.wypozyczenieId;
    WypozyczenieRepository.deleteWypozyczenie(wypozyczenieId)
        .then(result => {
            res.status(200).json({ message: 'Wypozyczenie usuniete', wypozyczenie: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

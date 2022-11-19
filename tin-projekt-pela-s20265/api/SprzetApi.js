/* eslint-disable no-unused-vars */
const SprzetRepository = require('../repository/sequelize/SprzetRepository');

exports.getSprzets = (req, res, next) => {
    SprzetRepository.getSprzets()
        .then(sprzets => {
            res.status(200).json(sprzets);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getSprzetById = (req, res, next) => {
    const sprzetId = req.params.sprzetId;
    SprzetRepository.getSprzetById(sprzetId)
        .then(sprzet => {
            if (!sprzet) {
                res.status(404).json({
                    message: `Brak sprzetu z id ${sprzetId}`
                })
            } else {
                res.status(200).json(sprzet);
            }

        });
};

exports.createSprzet = (req, res, next) => {
    SprzetRepository.createSprzet(req.body)
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

exports.updateSprzet = (req, res, next) => {
    const sprzetId = req.params.sprzetId;
    SprzetRepository.updateSprzet(sprzetId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Sprzet zaktualizowany!', sprzet: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.deleteSprzet = (req, res, next) => {
    const sprzetId = req.params.sprzetId;
    SprzetRepository.deleteSprzet(sprzetId)
        .then(result => {
            res.status(200).json({ message: 'Sprzet usuniety', sprzet: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

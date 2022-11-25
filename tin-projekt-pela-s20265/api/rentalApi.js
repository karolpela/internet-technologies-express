const rentalRepository = require('../repository/sequelize/rentalRepository');

exports.getRentals = (req, res, next) => {
    rentalRepository.getRentals()
        .then(rentals => {
            res.status(200).json(rentals);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getRentalById = (req, res, next) => {
    const rentalId = req.params.rentalId;
    rentalRepository.getRentalById(rentalId)
        .then(rental => {
            if (!rental) {
                res.status(404).json({
                    message: `Brak rentals z id ${rentalId}`
                })
            } else {
                res.status(200).json(rental);
            }
        });
};

exports.createRental = (req, res, next) => {
    rentalRepository.createRental(req.body)
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

exports.updateRental = (req, res, next) => {
    const rentalId = req.params.rentalId;
    rentalRepository.updateRental(rentalId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Wypożyczenie zaktualizowane!', rental: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.deleteRental = (req, res, next) => {
    const rentalId = req.params.rentalId;
    rentalRepository.deleteRental(rentalId)
        .then(result => {
            res.status(200).json({ message: 'Wypożyczenie usuniete', rental: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

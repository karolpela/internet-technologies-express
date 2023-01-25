const serviceRepository = require('../repository/sequelize/serviceRepository');

exports.getServices = (req, res, next) => {
    const statuses = req.query.status;
    if (statuses === undefined) {
        serviceRepository
            .getServices()
            .then((services) => {
                res.status(200).json(services);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        serviceRepository
            .getServicesByStatus(statuses)
            .then((services) => {
                res.status(200).json(services);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

exports.getServiceTypes = (req, res, next) => {
    const types = serviceRepository.getServiceTypes();
    res.status(200).json(types);
};

exports.getServiceById = (req, res, next) => {
    const serviceId = req.params.serviceId;
    serviceRepository.getServiceById(serviceId).then((service) => {
        if (!service) {
            res.status(404).json({
                message: `Brak przeglądu z id ${serviceId}`
            });
        } else {
            res.status(200).json(service);
        }
    });
};

exports.createService = (req, res, next) => {
    serviceRepository
        .createService(req.body)
        .then((newObj) => {
            res.status(201).json(newObj);
        })
        .catch((err) => {
            if (err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateService = (req, res, next) => {
    const serviceId = req.params.serviceId;
    serviceRepository
        .updateService(serviceId, req.body)
        .then((result) => {
            res.status(200).json({ message: 'Przegląd zaktualizowany!', service: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteService = (req, res, next) => {
    const serviceId = req.params.serviceId;
    serviceRepository
        .deleteService(serviceId)
        .then((result) => {
            res.status(200).json({ message: 'Przegląd usunięty', service: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

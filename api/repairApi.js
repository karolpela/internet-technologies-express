const repairRepository = require('../repository/sequelize/repairRepository');

exports.getRepairs = (req, res, next) => {
    repairRepository
        .getRepairs()
        .then((repairs) => {
            res.status(200).json(repairs);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getRepairById = (req, res, next) => {
    const repairId = req.params.repairId;
    repairRepository.getRepairById(repairId).then((repair) => {
        if (!repair) {
            res.status(404).json({
                message: `Brak naprawy z id ${repairId}`
            });
        } else {
            res.status(200).json(repair);
        }
    });
};

exports.getRepairStatuses = (req, res, next) => {
    res.status(200).json(repairRepository.getRepairStatuses());
};

exports.getEmployeeRepairById = (req, res, next) => {
    const employeeId = req.params.userId;
    const repairId = req.params.repairId;
    repairRepository.getEmployeeRepairById(employeeId, repairId).then((repair) => {
        if (!repair) {
            res.status(404).json({
                message: `Brak naprawy z id ${repairId} dla użytkownika z id ${employeeId}`
            });
        } else {
            res.status(200).json(repair);
        }
    });
};

exports.getRepairsByEmployee = (req, res, next) => {
    const employeeId = req.params.userId;
    repairRepository.getRepairsByEmployee(employeeId).then((repair) => {
        if (!repair) {
            res.status(404).json({
                message: `Brak napraw użytkownika z id ${employeeId}`
            });
        } else {
            res.status(200).json(repair);
        }
    });
};

exports.createRepair = (req, res, next) => {
    repairRepository
        .createRepair(req.body)
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

exports.updateRepair = (req, res, next) => {
    const repairId = req.params.repairId;
    repairRepository
        .updateRepair(repairId, req.body)
        .then((result) => {
            res.status(200).json({ message: 'Naprawa zaktualizowana!', repair: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteRepair = (req, res, next) => {
    const repairId = req.params.repairId;
    repairRepository
        .deleteRepair(repairId)
        .then((result) => {
            res.status(200).json({ message: 'Naprawa usunieta', repair: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

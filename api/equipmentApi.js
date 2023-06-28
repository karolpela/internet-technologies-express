const equipmentRepository = require('../repository/sequelize/equipmentRepository');

exports.getEquipment = (req, res, next) => {
    equipmentRepository
        .getEquipment()
        .then((equipment) => {
            res.status(200).json(equipment);
        })
        .catch((err) => {
            console.log(err);
        });
    var a = 4;
};

exports.getEquipmentById = (req, res, next) => {
    const customerId = req.user.userId;
    const userRole = req.user.role;
    const equipmentId = req.params.equipmentId;
    equipmentRepository.getEquipmentById(customerId, equipmentId, userRole).then((equipment) => {
        if (!equipment) {
            res.status(404).json({
                message: `Brak sprzętu z id ${equipmentId}`
            });
        } else {
            res.status(200).json(equipment);
        }
    });
};

exports.createEquipment = (req, res, next) => {
    equipmentRepository
        .createEquipment(req.body)
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

exports.updateEquipment = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    equipmentRepository
        .updateEquipment(equipmentId, req.body)
        .then((result) => {
            res.status(200).json({ message: 'Sprzęt zaktualizowany', equipment: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteEquipment = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    equipmentRepository
        .deleteEquipment(equipmentId)
        .then((result) => {
            res.status(200).json({ message: 'Sprzęt usunięty', equipment: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

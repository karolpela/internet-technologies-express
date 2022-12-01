const equipmentRepository = require('../repository/sequelize/equipmentRepository');

exports.showEquipmentList = (req, res, next) => {
    equipmentRepository.getEquipment().then((equipment) => {
        res.render('pages/equipment/list', { equipment: equipment, navLocation: 'equipment' });
    });
};

exports.showAddEquipmentForm = (req, res, next) => {
    res.render('pages/equipment/form', {
        equipment: {},
        pageTitle: 'Nowy sprzęt',
        formMode: 'createNew',
        btnLabel: 'Dodaj sprzęt',
        formAction: '/equipment/add',
        navLocation: 'equipment'
    });
};

exports.showEditEquipmentForm = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    equipmentRepository.getEquipmentById(equipmentId).then((equipment) => {
        res.render('pages/equipment/form', {
            equipment: equipment,
            pageTitle: 'Edycja sprzętu',
            formMode: 'edit',
            btnLabel: 'Edytuj sprzęt',
            formAction: '/equipment/edit',
            navLocation: 'equipment'
        });
    });
};

exports.showEquipmentDetails = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    equipmentRepository.getEquipmentById(equipmentId).then((equipment) =>
        res.render('pages/equipment/form', {
            equipment: equipment,
            pageTitle: 'Szczegóły sprzętu',
            formMode: 'showDetails',
            formAction: '',
            navLocation: 'equipment'
        })
    );
};

exports.addEquipment = (req, res, next) => {
    const equipmentData = { ...req.body };
    equipmentRepository.createEquipment(equipmentData).then((result) => {
        res.redirect('/equipment');
    });
};

exports.updateEquipment = (req, res, next) => {
    const equipmentId = req.body._id;
    const equipmentData = { ...req.body };
    equipmentRepository.updateEquipment(equipmentId, equipmentData).then((result) => {
        res.redirect('/equipment');
    });
};

exports.deleteEquipment = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    equipmentRepository.deleteEquipment(equipmentId).then((result) => {
        res.redirect('/equipment');
    });
};

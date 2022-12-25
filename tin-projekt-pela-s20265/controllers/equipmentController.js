const equipmentRepository = require('../repository/sequelize/equipmentRepository');

exports.showEquipmentList = (req, res, next) => {
    equipmentRepository.getEquipment().then((equipment) => {
        res.render('pages/equipment/list', { equipment: equipment, navLocation: 'equipment' });
    });
};

exports.showAddEquipmentForm = (req, res, next) => {
    res.render('pages/equipment/form', {
        equipment: {},
        pageTitle: req.__('equipment.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('equipment.form.add.btnLabel'),
        formAction: '/equipment/add',
        navLocation: 'equipment',
        validationErrors: []
    });
};

exports.showEditEquipmentForm = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    equipmentRepository.getEquipmentById(equipmentId).then((equipment) => {
        res.render('pages/equipment/form', {
            equipment: equipment,
            pageTitle: req.__('equipment.form.edit.pageTitle'),
            formMode: 'edit',
            btnLabel: req.__('equipment.form.edit.btnLabel'),
            formAction: '/equipment/edit',
            navLocation: 'equipment',
            validationErrors: []
        });
    });
};

exports.showEquipmentDetails = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    equipmentRepository.getEquipmentById(equipmentId).then((equipment) =>
        res.render('pages/equipment/form', {
            equipment: equipment,
            pageTitle: req.__('equipment.form.details.pageTitle'),
            formMode: 'showDetails',
            formAction: '',
            navLocation: 'equipment',
            validationErrors: []
        })
    );
};

exports.addEquipment = (req, res, next) => {
    const equipmentData = { ...req.body };
    equipmentRepository
        .createEquipment(equipmentData)
        .then((result) => {
            res.redirect('/equipment');
        })
        .catch((err) => {
            res.render('pages/equipment/form', {
                equipment: equipmentData,
                pageTitle: req.__('equipment.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('equipment.form.add.btnLabel'),
                formAction: '/equipment/add',
                navLocation: 'equipment',
                validationErrors: err.errors
            });
        });
};

exports.updateEquipment = (req, res, next) => {
    const equipmentId = req.body._id;
    const equipmentData = { ...req.body };
    equipmentRepository
        .updateEquipment(equipmentId, equipmentData)
        .then((result) => {
            res.redirect('/equipment');
        })
        .catch((err) => {
            res.render('pages/equipment/form', {
                equipment: equipmentData,
                pageTitle: req.__('equipment.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('equipment.form.edit.btnLabel'),
                formAction: '/equipment/edit',
                navLocation: 'equipment',
                validationErrors: err.errors
            });
        });
};

exports.deleteEquipment = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    equipmentRepository.deleteEquipment(equipmentId).then((result) => {
        res.redirect('/equipment');
    });
};

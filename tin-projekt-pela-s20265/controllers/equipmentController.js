exports.showEquipmentList = (req, res, next) => {
    res.render('pages/equipment/list', { navLocation: 'equipment' });
}

exports.showAddEquipmentForm = (req, res, next) => {
    res.render('pages/equipment/form', { navLocation: 'equipment' });
}

exports.showEditEquipmentForm = (req, res, next) => {
    res.render('pages/equipment/form-edit', { navLocation: 'equipment' });
}

exports.showEquipmentDetails = (req, res, next) => {
    res.render('pages/equipment/details', { navLocation: 'equipment' });
}
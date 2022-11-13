exports.showSprzetList = (req, res, next) => {
    res.render('pages/sprzet/list', { navLocation: 'sprzet' });
}

exports.showAddSprzetForm = (req, res, next) => {
    res.render('pages/sprzet/form', { navLocation: 'sprzet' });
}

exports.showEditSprzetForm = (req, res, next) => {
    res.render('pages/sprzet/form-edit', { navLocation: 'sprzet' });
}

exports.showSprzetDetails = (req, res, next) => {
    res.render('pages/sprzet/details', { navLocation: 'sprzet' });
}
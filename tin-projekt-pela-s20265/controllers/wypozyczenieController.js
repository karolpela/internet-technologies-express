exports.showWypozyczenieList = (req, res, next) => {
    res.render('pages/wypozyczenie/list', { navLocation: 'wypozyczenia' });
}

exports.showAddWypozyczenieForm = (req, res, next) => {
    res.render('pages/wypozyczenie/form', { navLocation: 'wypozyczenia' });
}

exports.showEditWypozyczenieForm = (req, res, next) => {
    res.render('pages/wypozyczenie/form-edit', { navLocation: 'wypozyczenia' });
}

exports.showWypozyczenieDetails = (req, res, next) => {
    res.render('pages/wypozyczenie/details', { navLocation: 'wypozyczenia' });
}
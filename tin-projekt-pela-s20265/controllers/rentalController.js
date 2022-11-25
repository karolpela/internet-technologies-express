exports.showRentalList = (req, res, next) => {
    res.render('pages/rental/list', { navLocation: 'rentals' });
}

exports.showAddRentalForm = (req, res, next) => {
    res.render('pages/rental/form', { navLocation: 'rentals' });
}

exports.showEditRentalForm = (req, res, next) => {
    res.render('pages/rental/form-edit', { navLocation: 'rentals' });
}

exports.showRentalDetails = (req, res, next) => {
    res.render('pages/rental/details', { navLocation: 'rentals' });
}
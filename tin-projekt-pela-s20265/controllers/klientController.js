exports.showKlientList = (req, res, next) => {
    res.render('pages/klient/list', { navLocation: 'klienci' });
}

exports.showAddKlientForm = (req, res, next) => {
    res.render('pages/klient/form', { navLocation: 'klienci' });
}

exports.showEditKlientForm = (req, res, next) => {
    res.render('pages/klient/form-edit', { navLocation: 'klienci' });
}

exports.showKlientDetails = (req, res, next) => {
    res.render('pages/klient/details', { navLocation: 'klienci' });
}
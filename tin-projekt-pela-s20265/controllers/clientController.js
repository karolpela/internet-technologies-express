exports.showClientList = (req, res, next) => {
    res.render('pages/client/list', { navLocation: 'clients' });
}

exports.showAddClientForm = (req, res, next) => {
    res.render('pages/client/form', { navLocation: 'clients' });
}

exports.showEditClientForm = (req, res, next) => {
    res.render('pages/client/form-edit', { navLocation: 'clients' });
}

exports.showClientDetails = (req, res, next) => {
    res.render('pages/client/details', { navLocation: 'clients' });
}
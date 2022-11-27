const customerRepository = require('../repository/sequelize/customerRepository');

exports.showCustomerList = (req, res, next) => {
    customerRepository.getCustomers()
        .then(customers => {
            res.render('pages/customer/list', { customers: customers, navLocation: 'customers' });
        })
}

exports.showAddCustomerForm = (req, res, next) => {
    res.render('pages/customer/form', {
        customer: {},
        pageTitle: 'Nowy klient',
        formMode: 'createNew',
        btnLabel: 'Dodaj klienta',
        formAction: '/customers/add',
        navLocation: 'customers'
    });
}

exports.showEditCustomerForm = (req, res, next) => {
    const customerId = req.params.customerId;
    customerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customer/form', {
                customer: customer,
                pageTitle: 'Edycja klienta',
                formMode: 'edit',
                btnLabel: 'Edytuj klienta',
                formAction: '/customers/edit',
                navLocation: 'customers'
            });
        });
}

exports.showCustomerDetails = (req, res, next) => {
    const customerId = req.params.customerId;
    customerRepository.getCustomerById(customerId)
        .then(customer =>
            res.render('pages/customer/form', {
                customer: customer,
                pageTitle: 'Szczegóły klienta',
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'customers'
            }))
}

exports.addCustomer = (req, res, next) => {
    const customerData = { ...req.body };
    customerRepository.createCustomer(customerData)
        .then(result => {
            res.redirect('/customers');
        });
}

exports.updateCustomer = (req, res, next) => {
    const customerId = req.body._id;
    const customerData = { ...req.body };
    customerRepository.updateCustomer(customerId, customerData)
        .then(result => {
            res.redirect('/customers');
        });
}

exports.deleteCustomer = (req, res, next) => {
    const customerId = req.body._id;
    customerRepository.deleteCustomer(customerId)
        .then(result => {
            res.redirect('/customers');
        });
}
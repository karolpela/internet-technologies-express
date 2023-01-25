const customerRepository = require('../repository/sequelize/customerRepository');
const authUtil = require('../util/authUtil');

exports.showCustomerList = (req, res, next) => {
    customerRepository.getCustomers().then((customers) => {
        res.render('pages/customer/list', { customers: customers, navLocation: 'customers' });
    });
};

exports.showAddCustomerForm = (req, res, next) => {
    res.render('pages/customer/form', {
        customer: {},
        pageTitle: req.__('customer.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('customer.form.add.btnLabel'),
        formAction: '/customers/add',
        navLocation: 'customers',
        validationErrors: []
    });
};

exports.showEditCustomerForm = (req, res, next) => {
    const customerId = req.params.userId;
    customerRepository.getCustomerById(customerId).then((customer) => {
        res.render('pages/customer/form', {
            customer: customer,
            pageTitle: req.__('customer.form.edit.pageTitle'),
            formMode: 'edit',
            btnLabel: req.__('customer.form.edit.btnLabel'),
            formAction: '/customers/edit',
            navLocation: 'customers',
            validationErrors: []
        });
    });
};

exports.showCustomerDetails = (req, res, next) => {
    const customerId = req.params.userId;
    customerRepository.getCustomerById(customerId).then((customer) =>
        res.render('pages/customer/form', {
            customer: customer,
            pageTitle: req.__('customer.form.details.pageTitle'),
            formMode: 'showDetails',
            formAction: '',
            navLocation: 'customers',
            validationErrors: []
        })
    );
};

exports.addCustomer = (req, res, next) => {
    const customerData = { ...req.body };
    customerData.password = authUtil.hashPassword(customerData.password);
    customerRepository
        .createCustomer(customerData)
        .then((result) => {
            res.redirect('/customers');
        })
        .catch((err) => {
            res.render('pages/customer/form', {
                customer: customerData,
                pageTitle: req.__('customer.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('customer.form.add.btnLabel'),
                formAction: '/customers/add',
                navLocation: 'customers',
                validationErrors: err.errors
            });
        });
};

exports.updateCustomer = (req, res, next) => {
    const customerId = req.body._id;
    const customerData = { ...req.body };
    customerData.password = authUtil.hashPassword(customerData.password);
    customerRepository
        .updateCustomer(customerId, customerData)
        .then((result) => {
            res.redirect('/customers');
        })
        .catch((err) => {
            res.render('pages/customer/form', {
                customer: customerData,
                pageTitle: req.__('customer.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('customer.form.edit.btnLabel'),
                formAction: '/customers/edit',
                navLocation: 'customers',
                validationErrors: err.errors
            });
        });
};

exports.deleteCustomer = (req, res, next) => {
    const customerId = req.params.userId;
    customerRepository.deleteCustomer(customerId).then((result) => {
        res.redirect('/customers');
    });
};

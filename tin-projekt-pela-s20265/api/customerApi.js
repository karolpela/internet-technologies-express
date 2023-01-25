const customerRepository = require('../repository/sequelize/customerRepository');
const authUtil = require('../util/authUtil');

exports.getCustomers = (req, res, next) => {
    const roles = req.query.role;
    if (roles === undefined) {
        customerRepository
            .getCustomers()
            .then((customers) => {
                res.status(200).json(customers);
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        customerRepository
            .getCustomersByRole(roles)
            .then((customers) => {
                res.status(200).json(customers);
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

exports.getCustomerById = (req, res, next) => {
    const customerId = req.params.userId;
    customerRepository.getCustomerById(customerId).then((customer) => {
        if (!customer) {
            res.status(404).json({
                message: `Brak klienta z id ${customerId}`
            });
        } else {
            res.status(200).json(customer);
        }
    });
};

exports.createCustomer = (req, res, next) => {
    req.body.password = authUtil.hashPassword(req.body.password);
    customerRepository
        .createCustomer(req.body)
        .then((newObj) => {
            res.status(201).json(newObj);
        })
        .catch((err) => {
            if (err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateCustomer = (req, res, next) => {
    const customerId = req.params.userId;
    customerRepository
        .updateCustomer(customerId, req.body)
        .then((result) => {
            res.status(200).json({ message: 'Klient zaktualizowany', customer: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteCustomer = (req, res, next) => {
    const customerId = req.params.userId;
    customerRepository
        .deleteCustomer(customerId)
        .then((result) => {
            res.status(200).json({ message: 'Klient usuniety', customer: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

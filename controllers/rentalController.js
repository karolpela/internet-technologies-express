const RentalRepository = require('../repository/sequelize/rentalRepository');
const CustomerRepository = require('../repository/sequelize/customerRepository');
const EquipmentRepository = require('../repository/sequelize/equipmentRepository');

exports.showRentalList = (req, res, next) => {
    RentalRepository.getRentals().then((rentals) => {
        res.render('pages/rental/list', { rentals: rentals, navLocation: 'rentals' });
    });
};

exports.showAddRentalForm = (req, res, next) => {
    let allCustomers, allEquipment;
    CustomerRepository.getCustomers()
        .then((customers) => {
            allCustomers = customers;
            return EquipmentRepository.getEquipment();
        })
        .then((equipment) => {
            allEquipment = equipment;
            res.render('pages/rental/form', {
                rental: {},
                formMode: 'createNew',
                allCustomers: allCustomers,
                allEquipment: allEquipment,
                pageTitle: req.__('rentals.form.add.pageTitle'),
                btnLabel: req.__('rentals.form.add.btnLabel'),
                formAction: '/rentals/add',
                navLocation: 'rentals',
                validationErrors: []
            });
        });
};

exports.showEditRentalForm = (req, res, next) => {
    const rentalId = req.params.rentalId;
    let allCustomers, allEquipment;

    CustomerRepository.getCustomers()
        .then((customers) => {
            allCustomers = customers;
            return EquipmentRepository.getEquipment();
        })
        .then((equipment) => {
            allEquipment = equipment;
            return RentalRepository.getRentalById(rentalId);
        })
        .then((rental) => {
            res.render('pages/rental/form', {
                rental: rental,
                allCustomers: allCustomers,
                allEquipment: allEquipment,
                pageTitle: req.__('rentals.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('rentals.form.edit.btnLabel'),
                formAction: '/rentals/edit',
                navLocation: 'rentals',
                validationErrors: []
            });
        });
};

exports.showRentalDetails = (req, res, next) => {
    const rentalId = req.params.rentalId;
    let allCustomers, allEquipment;

    CustomerRepository.getCustomers()
        .then((customers) => {
            allCustomers = customers;
            return EquipmentRepository.getEquipment();
        })
        .then((equipment) => {
            allEquipment = equipment;
            return RentalRepository.getRentalById(rentalId);
        })
        .then((rental) => {
            res.render('pages/rental/form', {
                rental: rental,
                allCustomers: allCustomers,
                allEquipment: allEquipment,
                pageTitle: req.__('rentals.form.add.pageTitle'),
                formMode: 'showDetails',
                formAction: '',
                navLocation: 'rentals',
                validationErrors: []
            });
        });
};

exports.addRental = (req, res, next) => {
    const rentalData = { ...req.body };
    RentalRepository.createRental(rentalData)
        .then((result) => {
            res.redirect('/rentals');
        })
        .catch((err) => {
            let allCustomers, allEquipment;
            CustomerRepository.getCustomers()
                .then((customers) => {
                    allCustomers = customers;
                    return EquipmentRepository.getEquipment();
                })
                .then((equipment) => {
                    allEquipment = equipment;
                    res.render('pages/rental/form', {
                        rental: { rentalData },
                        formMode: 'createNew',
                        allCustomers: allCustomers,
                        allEquipment: allEquipment,
                        pageTitle: req.__('rentals.form.add.pageTitle'),
                        btnLabel: req.__('rentals.form.add.btnLabel'),
                        formAction: '/rentals/add',
                        navLocation: 'rentals',
                        validationErrors: err.errors
                    });
                });
        });
};

exports.updateRental = (req, res, next) => {
    const rentalId = req.body._id;
    const rentalData = { ...req.body };
    RentalRepository.updateRental(rentalId, rentalData)
        .then((result) => {
            res.redirect('/rentals');
        })
        .catch((err) => {
            let allCustomers, allEquipment;

            CustomerRepository.getCustomers()
                .then((customers) => {
                    allCustomers = customers;
                    return EquipmentRepository.getEquipment();
                })
                .then((equipment) => {
                    allEquipment = equipment;
                    return RentalRepository.getRentalById(rentalId);
                })
                .then((rental) => {
                    res.render('pages/rental/form', {
                        rental: rentalData,
                        allCustomers: allCustomers,
                        allEquipment: allEquipment,
                        pageTitle: req.__('rentals.form.edit.pageTitle'),
                        formMode: 'edit',
                        btnLabel: req.__('rentals.form.edit.btnLabel'),
                        formAction: '/rentals/edit',
                        navLocation: 'rentals',
                        validationErrors: err.errors
                    });
                });
        });
};

exports.deleteRental = (req, res, next) => {
    const rentalId = req.params.rentalId;
    RentalRepository.deleteRental(rentalId).then((result) => {
        res.redirect('/rentals');
    });
};

const CustomerRepository = require('../repository/sequelize/customerRepository');
const authUtil = require('../util/authUtil');

exports.login = (req, res, next) => {
    const phoneNo = req.body.phoneNo;
    const password = req.body.password;

    CustomerRepository.findByPhoneNo(phoneNo)
        .then((customer) => {
            if (!customer) {
                res.render('index', {
                    navLocation: '',
                    loginError: 'Nieprawidłowy numer telefonu lub hasło'
                });
            } else if (authUtil.comparePasswords(password, customer.password)) {
                req.session.loggedUser = customer;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: 'Nieprawidłowy numer telefonu lub hasło'
                });
            }
        })
        .catch((err) => console.log(err));
};

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/');
};

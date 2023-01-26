const customerRepository = require('../repository/sequelize/customerRepository');
const config = require('../config/auth/key');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const phoneNo = req.body.phoneNo;
    const password = req.body.password;
    customerRepository.findByPhoneNo(phoneNo).then((user) => {
        if (!user) {
            return res.status(401).send({ message: 'wrongPhoneNoOrPassword' });
        }

        bcrypt
            .compare(password, user.password)
            .then((isEqual) => {
                if (!isEqual) {
                    return res.status(401).send({ message: 'wrongPhoneNoOrPassword' });
                }
                const token = jwt.sign(
                    {
                        phoneNo: user.phoneNo,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userId: user._id,
                        role: user.role
                    },
                    config.secret,
                    { expiresIn: '1h' }
                );
                res.status(200).json({
                    token: token,
                    userId: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(501);
            });
    });
};

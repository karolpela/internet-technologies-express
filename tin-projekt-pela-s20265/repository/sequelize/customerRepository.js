const Customer = require('../../model/sequelize/customer');
const Equipment = require('../../model/sequelize/equipment');
const Rental = require('../../model/sequelize/rental');

exports.getCustomers = () => {
    return Customer.findAll();
};

exports.getCustomerById = (customerId) => {
    return Customer.findByPk(customerId, {
        include: [
            {
                model: Rental,
                as: 'rentals',
                include: [
                    {
                        model: Equipment,
                        as: 'equipment'
                    }
                ]
            }
        ]
    });
};

exports.createCustomer = (newCustomerData) => {
    console.log(JSON.stringify(newCustomerData));
    return Customer.create({
        firstName: newCustomerData.firstName,
        lastName: newCustomerData.lastName,
        phoneNo: newCustomerData.phoneNo,
        password: newCustomerData.password
    });
};

exports.updateCustomer = (customerId, customerData) => {
    return Customer.update(customerData, { where: { _id: customerId } });
};

exports.deleteCustomer = (customerId) => {
    return Customer.destroy({
        where: { _id: customerId }
    });
};

exports.findByPhoneNo = (phoneNo) => {
    return Customer.findOne({
        where: { phoneNo: phoneNo }
    });
};

const Customer = require('../../model/sequelize/customer');
const Equipment = require('../../model/sequelize/equipment');
const Rental = require('../../model/sequelize/rental');

exports.getCustomers = () => {
    return Customer.findAll();
}

exports.getCustomerById = (customerId) => {
    return Customer.findByPk(customerId,
        {
            include: [{
                model: Rental,
                as: 'rentals',
                include: [{
                    model: Equipment,
                    as: 'equipment'
                }]
            }]
        });
};

exports.createCustomer = (newCustomerData) => {
    return Customer.create({
        firstName: newCustomerData.firstName,
        lastName: newCustomerData.lastName,
        phoneNo: newCustomerData.phoneNo,
    })
}

exports.updateCustomer = (customerId, customerData) => {
    const firstName = customerData.firstName;
    const lastName = customerData.lastName;
    const phoneNo = customerData.phoneNo;
    return Customer.update(customerData, { where: { _id: customerId } });
};

exports.deleteCustomer = (customerId) => {
    return Customer.destroy({
        where: { _id: customerId }
    });
};
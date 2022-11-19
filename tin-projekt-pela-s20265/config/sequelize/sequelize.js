const Sequelize = require('sequelize');

const sequelize = new Sequelize('tin-pela-sequelize', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',

    //prevent adding "s" to table names
    define: {
        freezeTableName: true
    }
});

module.exports = sequelize;
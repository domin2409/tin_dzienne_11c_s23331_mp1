const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Gatunek = sequelize.define('Gatunek', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    gatunek: {
        type: Sequelize.STRING,
        allowNull: false

    }

})
module.exports = Gatunek;
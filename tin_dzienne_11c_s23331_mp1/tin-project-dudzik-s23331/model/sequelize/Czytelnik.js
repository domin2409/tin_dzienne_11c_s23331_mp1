const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Czytelnik = sequelize.define('Czytelnik', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    imie: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    nazwisko: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    data_dolaczenia: {
        type: Sequelize.DATE,
        allowNull: false

    }

})
module.exports = Czytelnik;
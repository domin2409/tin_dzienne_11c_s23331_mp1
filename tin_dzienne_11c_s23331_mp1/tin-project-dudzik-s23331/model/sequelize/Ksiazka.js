const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Ksiazka = sequelize.define('Ksiazka', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    tytul: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    autor_imie: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    autor_nazwisko: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    waga: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    data_wydania: {
        type: Sequelize.DATE,
        allowNull: false

    },
    gatunek: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

})
module.exports = Ksiazka;
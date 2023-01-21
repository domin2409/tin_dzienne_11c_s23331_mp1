const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Wypozyczenie = sequelize.define('Wypozyczenie', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    data_wypozyczenia: {
        type: Sequelize.DATE,
        allowNull: false

    },
    zwrocono: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    id_czytelnik: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_ksiazka: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

})
module.exports = Wypozyczenie;
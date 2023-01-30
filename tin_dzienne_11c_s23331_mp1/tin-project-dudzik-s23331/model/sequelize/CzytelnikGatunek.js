const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const CzytelnikGatunek = sequelize.define('CzytelnikGatunek', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    id_czytelnik: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_gatunek: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

})
module.exports = CzytelnikGatunek;
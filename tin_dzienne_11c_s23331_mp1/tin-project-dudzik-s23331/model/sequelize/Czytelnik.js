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
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            len:{
                args: [2,60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            }
        }
    },
    nazwisko: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            len:{
                args: [2,60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            }
        }
    },

    data_dolaczenia: {
        type: Sequelize.DATE,
        allowNull: false

    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [2,60],
                msg: 'len_2_60'
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg: "Pole jest wymagane"
            },
            len:{
                args: [5,60],
                msg: "Pole powinno zawierać od 5 do 60 znaków",
                isEmail:{
                    msg:"Pole powinno zawierać prawidłowy email"
                }
            }
        }
    }

})
module.exports = Czytelnik;
const Sequalize = require('sequelize');

const Czytelnik = require("../../model/sequelize/Czytelnik");
const Wypozyczenie = require("../../model/sequelize/Wypozyczenie");
const Ksiazka = require("../../model/sequelize/Ksiazka");

exports.getWypozyczenie = () => {
    return Wypozyczenie.findAll({include: [
        {
            model: Czytelnik,
            as: 'czytelnik'
}, {
                model: Ksiazka,
                as: 'ksiazka'
            }]
    });
};

exports.getWypozyczenieById = (id_wypozyczenie) => {
    return Wypozyczenie.findByPk(id_wypozyczenie, {
        include: [{
            model: Czytelnik,
            as: 'czytelnik'
        },{
            model: Ksiazka,
            as: 'ksiazka'
        }]
    });
};



exports.createWypozyczenie = (data) =>{
    console.log(JSON.stringify(data));

    return Wypozyczenie.create({
        id_czytelnik: data.id_czytelnik,
        id_ksiazka: data.id_ksiazka,
        data_wypozyczenia: data.data_wypozyczenia,
        zwrocono: data.zwrocono
    });
};

exports.updateWypozyczenie = (id_wypozyczenie, data) => {

    return Wypozyczenie.update(data, {where: {_id: id_wypozyczenie}
    });


};

exports.deleteWypozyczenie = (id_wypozyczenie) =>{
    return Wypozyczenie.destroy({
        where: {_id: id_wypozyczenie}
    });
};

exports.deleteManyWypozyczenie = (ids_wypozyczenie) =>{
    return Wypozyczenie.find({
        _id:{ [Sequalize.Op.in]: ids_wypozyczenie}
    });
};

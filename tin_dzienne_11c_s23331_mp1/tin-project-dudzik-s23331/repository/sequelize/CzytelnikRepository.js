const Czytelnik = require("../../model/sequelize/Czytelnik");
const Wypozyczenie = require("../../model/sequelize/Wypozyczenie");
const Ksiazka = require("../../model/sequelize/Ksiazka");

exports.getCzytelnicy = () => {
    return Czytelnik.findAll();
};

exports.getCzytelnikById = (id_czytelnik) => {
    return Czytelnik.findByPk(id_czytelnik, {
        include: [{
            model: Wypozyczenie,
            as: 'wypozyczenia',
            include: [{
                model: Ksiazka,
                as: 'ksiazka'
            }]
        }]
    });
};



exports.createCzytelnik = (newCzytelnikData) =>{
    return Czytelnik.create({
        imie: newCzytelnikData.imie,
        nazwisko: newCzytelnikData.nazwisko,
        data_dolaczenia: newCzytelnikData.data_dolaczenia
    });
};

exports.updateCzytelnik = (id_czytelnik, czytelnikData) => {
    const imie = czytelnikData.imie;
    const nazwisko = czytelnikData.nazwisko;
    const data_dolaczenia = czytelnikData.data_dolaczenia;
    return Czytelnik.update(czytelnikData, {where: {_id: id_czytelnik}
    });
};

    exports.deleteCzytelnik = (id_czytelnik) =>{
        return Czytelnik.destroy({
        where: {_id: id_czytelnik}
        });
    };



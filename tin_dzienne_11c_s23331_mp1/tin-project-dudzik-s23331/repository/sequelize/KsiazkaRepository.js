const Czytelnik = require("../../model/sequelize/Czytelnik");
const Wypozyczenie = require("../../model/sequelize/Wypozyczenie");
const Ksiazka = require("../../model/sequelize/Ksiazka");

exports.getKsiazki = () => {
    return Czytelnik.findAll();
};

exports.getKsiazkaById = (id_ksiazka) => {
    return Ksiazka.findByPk(id_ksiazka, {
        include: [{
            model: Wypozyczenie,
            as: 'wypozyczenia',
            include: [{
                model: Czytelnik,
                as: 'czytelnik'
            }]
        }]
    });
};



exports.createKsiazka = (newKsiazkaData) =>{
    return Ksiazka.create({
        tytul: newKsiazkaData.tytul,
        autor_imie: newKsiazkaData.autor_nazwisko,
        autor_nazwisko: newKsiazkaData.autor_nazwisko,
        waga: newKsiazkaData.waga,
        data_wydania: newKsiazkaData.data_wydania
    });
};

exports.updateKsiazka = (id_ksiazka, ksiazkaData) => {
    // const imie = czytelnikData.imie;
    // const nazwisko = czytelnikData.nazwisko;
    // const data_dolaczenia = czytelnikData.data_dolaczenia;
    return Ksiazka.update(ksiazkaData, {where: {_id: id_ksiazka}
    });
};

    exports.deleteKsiazka = (id_ksiazka) =>{
        return Ksiazka.destroy({
        where: {_id: id_ksiazka}
        });
    };



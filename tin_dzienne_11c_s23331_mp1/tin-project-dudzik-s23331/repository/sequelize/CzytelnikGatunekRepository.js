

const CzytelnikGatunek = require("../../model/sequelize/CzytelnikGatunek");
const Wypozyczenie = require("../../model/sequelize/Wypozyczenie");
const Ksiazka = require("../../model/sequelize/Ksiazka");

exports.getCzytelnicy = () => {
    return CzytelnikGatunek.findAll();
};

exports.getCzytelnikGatunekById = (id_czytelnikGatunek) => {
    return CzytelnikGatunek.findByPk(id_czytelnikGatunek, {
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


exports.findByEmail = (email) => {
    return CzytelnikGatunek.findOne({
        where: {email: email}
    })
}

exports.createCzytelnikGatunek = (newCzytelnikGatunekData) =>{
    return CzytelnikGatunek.create({
        id_czytelnik: newCzytelnikGatunekData.id_czytelnik,
        id_gatunek: newCzytelnikGatunekData.id_gatunek
    });
};

exports.updateCzytelnikGatunek = (id_czytelnikGatunek, czytelnikGatunekData) => {
    const id_czytelnik = czytelnikGatunekData.id_czytelnik;
    const id_gatunek = czytelnikGatunekData.id_gatunek;
    return CzytelnikGatunek.update(czytelnikGatunekData, {where: {_id: id_czytelnikGatunek}
    });
};

exports.deleteCzytelnikGatunek = (id_czytelnikGatunek) =>{
    return CzytelnikGatunek.destroy({
        where: {_id: id_czytelnikGatunek}
    });
};



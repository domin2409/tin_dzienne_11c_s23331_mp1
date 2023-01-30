const sequelize = require('./sequelize');
const Ksiazka = require('../../model/sequelize/Ksiazka');
const Wypozyczenie = require('../../model/sequelize/Wypozyczenie');
const Czytelnik = require('../../model/sequelize/Czytelnik');
const CzytelnikGatunek = require('../../model/sequelize/CzytelnikGatunek');
const Gatunek = require('../../model/sequelize/Gatunek');
const authUtil = require('../../util/authUtils')
const passHash = authUtil.hashPassword('12345')

module.exports = () => {
    Czytelnik.hasMany(Wypozyczenie, {as: 'wypozyczenia', foreignKey: {name: 'id_czytelnik', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Wypozyczenie.belongsTo(Czytelnik, {as: 'czytelnik', foreignKey: {name: 'id_czytelnik', allowNull: false} });
    Ksiazka.hasMany(Wypozyczenie, {as: 'wypozyczenia', foreignKey: {name: 'id_ksiazka', allowNull: false}, constraints: true, onDelete: 'CASCADE'});
    Wypozyczenie.belongsTo(Ksiazka, {as: 'ksiazka', foreignKey: {name: 'id_ksiazka', allowNull: false} });
    // CzytelnikGatunek.hasMany(Czytelnik, {as: 'czytelnik', foreignKey: {name: 'id_czytelnik', allowNull: false} });
    // CzytelnikGatunek.hasMany(Gatunek, {as: 'gatuenk', foreignKey: {name: 'id_gatunek', allowNull: false} });
    let allCzytelnik, allKsiazka;
    return sequelize
        .sync({force: true})
        .then(() => {
            return Czytelnik.findAll()})
        .then(czytelnicy=> {
            if (!czytelnicy || czytelnicy.length == 0) {
                return Czytelnik.bulkCreate([
                    {imie: 'Jan', nazwisko: 'Dmoch', data_dolaczenia: '2009-06-02', email: 'jan@gmail.com', password: passHash},
                    {imie: 'Adam', nazwisko: 'Małysz', data_dolaczenia: '2011-12-22', email: 'adam@gmail.com', password: passHash},
                    {imie: 'Robert', nazwisko: 'Lewandowski', data_dolaczenia: '2022-09-24', email: 'robert@gmail.com', password: passHash},
                    {imie: 'Mariusz', nazwisko: 'Pudzianowski', data_dolaczenia: '2023-01-02', email: 'mariusz@gmail.com', password: passHash},
                ])
                    .then( () => {
                        return Czytelnik.findAll();
                    });
            } else {
              return czytelnicy;
            }
        })
        .then(czytelnicy => {
            allCzytelnik = czytelnicy;
            return Ksiazka.findAll();
        })
        .then( ksiazki => {
            if (!ksiazki || ksiazki.length == 0){
                return Ksiazka.bulkCreate([
                    {tytul: 'Mistrz i Małgorzata', autor_imie: 'Michaił', autor_nazwisko: 'Bułhakow', waga: '350', data_wydania:'1966-01-01', gatunek: '1'},
                    {tytul: 'Poradnik podrywu', autor_imie:'Paweł', autor_nazwisko: 'Turowski', waga: '15', data_wydania:'2022-06-09', gatunek: '1'},
                    {tytul: 'Asterix i Obelix', autor_imie: 'René', autor_nazwisko: 'Goscinny', waga: '280', data_wydania:'1959-10-29', gatunek: '3'},
                    {tytul: 'Gorzkie żale', autor_imie: 'Jan', autor_nazwisko: 'Dmoch', waga: '690', data_wydania:'2000-11-16', gatunek: '2'}
                ])
                    .then(() => {
                        return Ksiazka.findAll();
                    });

            } else {
                return ksiazki;
            }
        })
        .then(ksiazki => {
            allKsiazka = ksiazki;
            return Wypozyczenie.findAll();
        })
        .then(gatunek => {
            if (!gatunek || gatunek.length == 0) {
                return Gatunek.bulkCreate([
                    {gatunek: "Obyczajowy"},
                    {gatunek: "Kryminał"},
                    {gatunek: "Poradnik"},
                    {gatunek: "Kulinaria"},
                    {gatunek: "Podróże"}
                ]);
            } else {
                return gatunek;
            }
        })
        .then( () => {
            return Gatunek.findAll();
        })
        .then(czytelnikGatunek => {
                if(!czytelnikGatunek || czytelnikGatunek.length == 0 ){

                    return CzytelnikGatunek.bulkCreate([
                        {id_czytelnik: allCzytelnik[0]._id, id_gatunek: '1'},
                        {id_czytelnik: allCzytelnik[1]._id, id_gatunek: '1'},
                        {id_czytelnik: allCzytelnik[3]._id, id_gatunek: '2'},
                        {id_czytelnik: allCzytelnik[2]._id, id_gatunek: '1'},
                        {id_czytelnik: allCzytelnik[2]._id, id_gatunek: '2'},
                        {id_czytelnik: allCzytelnik[2]._id, id_gatunek: '3'}
                    ]);
                } else {
                    return czytelnikGatunek;
                }
        })
        .then( () => {
            return CzytelnikGatunek.findAll();
        })

        .then(wypozyczenia => {
            if(!wypozyczenia || wypozyczenia.length == 0 ){
                console.log("tutaj:"+ allKsiazka);

                return Wypozyczenie.bulkCreate([
                    {id_czytelnik: allCzytelnik[0]._id, id_ksiazka: allKsiazka[0]._id, zwrocono: 0, data_wypozyczenia:'2022-11-29'},
                    {id_czytelnik: allCzytelnik[2]._id, id_ksiazka: allKsiazka[1]._id, zwrocono: 0, data_wypozyczenia:'2022-11-29'},
                    {id_czytelnik: allCzytelnik[1]._id, id_ksiazka: allKsiazka[2]._id, zwrocono: 0, data_wypozyczenia:'2022-11-29'}
                ]);
            } else {
                return wypozyczenia;
            }
        })
        .then( () => {
            return Wypozyczenie.findAll();
        });

};



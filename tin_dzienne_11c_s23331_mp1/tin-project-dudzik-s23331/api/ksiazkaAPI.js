const KsiazkaRepository = require("../repository/sequelize/KsiazkaRepository");

exports.getKsiazka = (req, res, next) => {
    KsiazkaRepository.getKsiazki()
        .then(ksiazka => {
            res.status(200).json(ksiazka);
        })
        .catch(err => {
            console.log(err);
        })
};


exports.getKsiazkaById = (req, res, next) => {

    const id_ksiazka = req.params.id_ksiazka;
    KsiazkaRepository.getKsiazkaById(id_ksiazka)
        .then(ksiazka => {
            if(!ksiazka) {
                res.status(404).json({
                    message: 'ksiazka o id: '+id_ksiazka+' nie istnieje'
                })
            } else {
                res.status(200).json(ksiazka);
            }
        })

};

exports.createKsiazka = (req, res, next) => {
    KsiazkaRepository.createKsiazka(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })

        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateKsiazka =(req, res, next) => {
    const id_ksiazka = req.params.id_ksiazka;
    KsiazkaRepository.updateKsiazka(id_ksiazka, req.body)
        .then(result => {
            res.status(200).json({message: 'Ksiazka zaktualizowany!', ksiazka: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.deleteKsiazka =(req, res, next) => {
    const id_ksiazka = req.params.id_ksiazka;
    KsiazkaRepository.deleteKsiazka(id_ksiazka)
        .then(result => {
            res.status(200).json({message: 'Ksiazka usunięty!', ksiazka: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}
























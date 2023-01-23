const WypozyczenieRepository = require("../repository/sequelize/WypozyczenieRepository");

exports.getWypozyczenie = (req, res, next) => {
    WypozyczenieRepository.getWypozyczenie()
        .then(wypozyczenie => {
            res.status(200).json(wypozyczenie);
        })
        .catch(err => {
            console.log(err);
        })
};


exports.getWypozyczenieById = (req, res, next) => {

    const id_wypozyczenie = req.params.id_wypozyczenie;
    WypozyczenieRepository.getWypozyczenieById(id_wypozyczenie)
        .then(wypozyczenie => {
            if(!wypozyczenie) {
                res.status(404).json({
                    message: 'Wypozyczenie o id: '+id_wypozyczenie+' nie istnieje'
                })
            } else {
                res.status(200).json(wypozyczenie);
            }
        })

};

exports.createWypozyczenie = (req, res, next) => {
    WypozyczenieRepository.createWypozyczenie(req.body)
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

exports.updateWypozyczenie =(req, res, next) => {
    const id_wypozyczenie = req.params.id_wypozyczenie;
    WypozyczenieRepository.updateWypozyczenie(id_wypozyczenie, req.body)
        .then(result => {
            res.status(200).json({message: 'Wypozyczenie zaktualizowany!', wypozyczenie: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.deleteWypozyczenie =(req, res, next) => {
    const id_wypozyczenie = req.params.id_wypozyczenie;
    WypozyczenieRepository.deleteWypozyczenie(id_wypozyczenie)
        .then(result => {
            res.status(200).json({message: 'Wypozyczenie usunięty!', wypozyczenie: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}
























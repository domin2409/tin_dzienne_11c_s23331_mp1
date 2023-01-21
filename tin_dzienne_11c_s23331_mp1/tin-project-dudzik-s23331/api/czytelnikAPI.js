const CzytelnikRepository = require("../repository/sequelize/CzytelnikRepository");

exports.getCzytelnicy = (req, res, next) => {
    CzytelnikRepository.getCzytelnicy()
        .then(czytelnicy => {
            res.status(200).json(czytelnicy);
        })
        .catch(err => {
            console.log(err);
        })
};


exports.getCzytelnikById = (req, res, next) => {

    const id_czytelnik = req.params.id_czytelnik;
    CzytelnikRepository.getCzytelnikById(id_czytelnik)
        .then(czytelnik => {
            if(!czytelnik) {
                res.status(404).json({
                    message: 'Czytelnik o id: '+id_czytelnik+' nie istnieje'
                })
            } else {
                res.status(200).json(czytelnik);
            }
        })

};

exports.createCzytelnik = (req, res, next) => {
    CzytelnikRepository.createCzytelnik(req.body)
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

exports.updateCzytelnik =(req, res, next) => {
    const id_czytelnik = req.params.id_czytelnik;
    CzytelnikRepository.updateCzytelnik(id_czytelnik, req.body)
        .then(result => {
            res.status(200).json({message: 'Czytelnik zaktualizowany!', czytelnik: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.deleteCzytelnik =(req, res, next) => {
    const id_czytelnik = req.params.id_czytelnik;
    CzytelnikRepository.deleteCzytelnik(id_czytelnik)
        .then(result => {
            res.status(200).json({message: 'Czytelnik usunięty!', czytelnik: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}
























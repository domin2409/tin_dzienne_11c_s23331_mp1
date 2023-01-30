const CzytelnikGatunekRepository = require("../repository/sequelize/CzytelnikGatunekRepository");

exports.getCzytelnikGatunek = (req, res, next) => {
    CzytelnikGatunekRepository.getCzytelnikGatunek()
        .then(czytelnikGatunek => {
            res.status(200).json(czytelnikGatunek);
        })
        .catch(err => {
            console.log(err);
        })
};


exports.getCzytelnikGatunekById = (req, res, next) => {

    const id_czytelnikGatunek = req.params.id_czytelnikGatunek;
    CzytelnikGatunekRepository.getCzytelnikGatunekById(id_czytelnikGatunek)
        .then(czytelnikGatunek => {
            if(!czytelnikGatunek) {
                res.status(404).json({
                    message: 'CzytelnikGatunek o id: '+id_czytelnikGatunek+' nie istnieje'
                })
            } else {
                res.status(200).json(czytelnikGatunek);
            }
        })

};

exports.createCzytelnikGatunek = (req, res, next) => {
    CzytelnikGatunekRepository.createCzytelnikGatunek(req.body)
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

exports.updateCzytelnikGatunek =(req, res, next) => {
    const id_czytelnikGatunek = req.params.id_czytelnikGatunek;
    CzytelnikGatunekRepository.updateCzytelnikGatunek(id_czytelnikGatunek, req.body)
        .then(result => {
            res.status(200).json({message: 'CzytelnikGatunek zaktualizowany!', czytelnikGatunek: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.deleteCzytelnikGatunek =(req, res, next) => {
    const id_czytelnikGatunek = req.params.id_czytelnikGatunek;
    CzytelnikGatunekRepository.deleteCzytelnikGatunek(id_czytelnikGatunek)
        .then(result => {
            res.status(200).json({message: 'CzytelnikGatunek usunięty!', czytelnikGatunek: result});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}
























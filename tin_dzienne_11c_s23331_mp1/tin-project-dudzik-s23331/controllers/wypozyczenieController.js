exports.showWypozyczenieList =(req, res, next) => {
    res.render('pages/wypozyczenie/list', {navLocation: 'wypozyczenie'});
}

exports.showWypozyczenieDetails =(req, res, next) => {
    res.render('pages/wypozyczenie/details', {navLocation: 'wypozyczenie'});
}

exports.showAddWypozyczenieForm =(req, res, next) => {
    res.render('pages/wypozyczenie/form', {navLocation: 'wypozyczenie'});
}
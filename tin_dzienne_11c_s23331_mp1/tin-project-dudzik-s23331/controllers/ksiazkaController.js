exports.showKsiazkaList =(req, res, next) => {
    res.render('pages/ksiazka/list', {navLocation: 'ksiazka'});
}

exports.showKsiazkaDetails =(req, res, next) => {
    res.render('pages/ksiazka/details', {navLocation: 'ksiazka'});
}

exports.showAddKsiazkaForm =(req, res, next) => {
    res.render('pages/ksiazka/form', {navLocation: 'ksiazka'});
}
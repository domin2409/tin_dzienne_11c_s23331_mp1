exports.showCzytelnikList =(req, res, next) => {
    res.render('pages/czytelnik/list', {navLocation: 'czytelnik'});
}

exports.showCzytelnikDetails =(req, res, next) => {
    res.render('pages/czytelnik/details', {navLocation: 'czytelnik'});
}

exports.showAddCzytelnikForm =(req, res, next) => {
    res.render('pages/czytelnik/form', {navLocation: 'czytelnik'});
}
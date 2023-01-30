const CzytelnikRepository = require('../repository/sequelize/CzytelnikRepository')
const authUtil = require("../util/authUtils");

exports.login = (req, res, next) => {
    const email =req.body.email;
    const password =req.body.password;
    CzytelnikRepository.findByEmail(email)
        .then(czytelnik =>{
            if(!czytelnik) {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            } else if (authUtil.comparePasswords(password, czytelnik.password) === true) {
                req.session.loggedUser = czytelnik;
                res.redirect('/');
            } else {
                res.render('index', {
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"

                })
            }
        })
        .catch(err =>{
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.logedUser = undefined;
    res.redirect('/');
}








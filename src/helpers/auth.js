//SIRVE PARA AUTENTICAR UNA SESIÓN Y PROTEGER LAS URL PRIVADAS
const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();     //SI ESTE USUARIO ESTA AUTENTICADO ENTONCES SIGUE CON LA FUNCION ORIGINAL (LAS URL)
    }
    req.flash("error_msg", "No estas autorizado para esta operación");
    res.redirect("/users/signin");
};

module.exports = helpers;
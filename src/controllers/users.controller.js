const usersCtrl = {};

const passport = require("passport");

const User = require("../models/User");

usersCtrl.renderSignUpForm = (req, res) => {
    res.render("users/signup");
};

usersCtrl.signup = async (req, res) => {
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    if (password != confirm_password) {                          //SE AGREGA CONDICIONES AL CREAR UNA CONSTRASEÑA MEDIANTE LA CONST ERROR
        errors.push({text: "Las contraseñas no coinciden"})
    }
    if (password.length < 4 ) {
        errors.push({text: "La contraseña debe tener al menos 4 caracteres"})
    }
    if (errors.length > 0 ) {
        res.render("users/signup", {
            errors,
            name,  //PARA DEVOLVER LO QUE EL USUARIO ESCRIBIO SIN TENER QUE VOLVERLO A ESCRIBIR
            email
        })
    } else {
        const emailUser  = await User.findOne({email: email});  //PARA SOLICITAR A LA BASE DE DATOS QUE VERIFIQUE SI YA HAY UN EMAIL IGUAL
        if (emailUser) {
            req.flash("error_msg", "El correo electrónico ya existe");
            res.redirect("/users/signup");
        } else {
            const newUser = new User({name, email, password});  //SI NO HAY CONFLICTO ENTONCES SE CREARA EL NUEVO USUARIO
            newUser.password = await newUser.encryptPassword(password)  //LINKEADO "User.js" PERMITE CIFRAR LAS CONTRASEÑAS ALOJADAS EN LA BD
            await newUser.save();   //GUARDAR AL NUEVO USUARIO EN LA BASE DE DATOS MEDIANTE LA CONSTANTE "newUser"
            req.flash("success_msg", "Registro completado");
            res.redirect("/users/signin");
        }
    }
};

usersCtrl.renderSigninForm = (req, res) => {
    res.render("users/signin");
};

usersCtrl.signin = passport.authenticate("local", {
    failureRedirect: "/users/signin",
    successRedirect: "/src/views/dashboard.hbs",
    failureFlash: true,
})

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash("success_msg", "Se ha cerrado sesión");
    res.redirect("/users/signin");
};

module.exports = usersCtrl;
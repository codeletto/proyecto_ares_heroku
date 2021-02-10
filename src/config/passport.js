const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

passport.use(new LocalStrategy({
    usernameField: "email",      //CUANDO QUIERO AUTENTICAR RECIBIRE UN CAMPO QUE TIENE COMO NOMBRE "email"
    passwordField: "password"
},  async (email, password, done ) => {     //"done" ES UN CALLBACK

    // VALIDAR EL EMAIL DEL USUARIO

    const user = await User.findOne({email}) //SIRVE PARA VERIFICAR SI EL EMAIL EXISTE, DE SER ASI ME DEVOLVERA LOS DATOS DEL USUARIO
    if(!user) {     //SI NO EXISTE
        return done(null, false, { message: "El usurio no existe"});  //ENVIAR EL MENSAJE "No xiste el usuario"
    } else {  //EN CASO EXISTA SE VALIDARA LO SIGUIENTE
    // VALIDAR LA CONTRASEÑA DEL USUARIO
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, {message: "Contraseña incorrecta"});
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});

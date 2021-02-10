//ESTE ARCHIVO TENDRA LOS DATOS RELACIONADOS CON LOS USUARIOS
const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema  ({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

UserSchema.methods.encryptPassword = async password => {  // CREAMOS UN METODO LLAMADO "encrypPassword" PARA PODER ENCRIPTAR LA CONTRASEÑA DEL USUARIO
    const salt = await bcrypt.genSalt(10);  // AL LLAMAR "bcrypt" DEBEMOS GENERAR UN "SALT" QUE ES UN MODULO QUE ENCRIPTA LA CONTRASEÑA, EL NUMERO DE VECES POR DEFECTO ES 10 MIENTRAS MAYOR SEA EL NUMERO MAS SEGURA ES LA CONSTRASEÑA. ESTE METODO ES ASÍNCRONO
    return await bcrypt.hash(password, salt);  // SE EJECUTA EL CIFRADO DE LA CONTRASEÑA
}  // PARA QUE EL SERVIDOR VAYAN EJECUTANDO OTRAS OPERACIONES DEBEMOS INDICAR QUE EL "SALT" ES ASÍNCRONO USANDO LAS PALABRAS "ASYNC" "AWAIT"

UserSchema.methods.matchPassword =  async function(password) {
    return await bcrypt.compare(password, this.password) //ESE ALGORITMO SIRVE PARA COMPARAR EL CIFRADO DE LA CONTRASEÑA CON LA INGRESADA POR EL USUARIO AL USAR EL METODO "COMPARE" ARROJA UNA RESPUESTA BOOLEANA DONDE DEPENDIENDO DEL RESULTADO DARA ACCESO O NO AL USUARIO
};

module.exports = model("User", UserSchema);


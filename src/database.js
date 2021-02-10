const mongoose = require("mongoose");

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE} = process.env;
const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;//METODO PARA OCULTAR LA RUTA DE LA BASE DE DATOS
 
mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,     //parametros solicitados por mongodb.client
    useNewUrlParser: true,
    useCreateIndex: true           
})
    .then(db => console.log("La base de datos está conectada"))  //mensaje para saber si se realizo la operación correctamente o hubo un error
    .catch(err => console.log("La base de datos no está conectada"));
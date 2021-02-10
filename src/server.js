const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const morgan = require("morgan");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

// Initializations
const app = express();
require("./config/passport");

// Settings - Lo que yo quiero que Express haga basado en algunos modulos
app.set("port", process.env.PORT || 3000);  //[A].SERVER - EXISTE UN PUERTO? SINO USA EL PUERTO 4000
app.set("views", path.join(__dirname, "/views" )); // SE LE INDICA A NODE QUE LA RUTA DE LA CARPETA VIEW. UTIL PARA CUANDO QUERAMOS RENDERIZAR UNA VISTA
app.engine(".hbs", exphbs({ //CONFIGURACION DEL MOTOR DE PLANTILLAS DE NOMBRE ".hbs" //SE DIVIDE EN 2 CONCEPTOS, PARTIAL Y LAYOUT. LAYOUT SON UNA ESPECIA DE PLANTILLA DONDE SE COLOCA CODIGO COMUN DE HTML. LOS PARTIAL SON PEDAZOS DE CODIGO HTML EL CUAL SE PODRA IMPORTA EN OTROS ARCHIVOS HTML
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"), //SE INDICA LA RUTA DE LAS CARPETAS
    partialsDir: path.join(app.get("views"), "partials"), //SE INDICA LA RUTA DE LAS CARPETAS
    extname: ".hbs" //SE INDICA EL NOMBRE DE LA EXTENSION DE LOS ARCHIVOS A USAR
}));

app.set("view engine", ".hbs"); //AQUI SE INDICA QUE EL MOTOR DE LA PLANTILLA A USAR ES EL QUE SE CREO "HBS"


// Middlewares - Son funciones que se van ejecutando a medida que van llegando peticiones
app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));  //LE DICE AL SERVIDOR QUE CADA VEZ QUE LLEGUEN DATOS DESDE UN FORMULARIO LO CONVIERTA EN FORMATO JASON
app.use(methodOverride("_method"));
app.use(session({
    secret: "secret",
    resave: "true",
    saveUninitialized: "true",
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables - Se crearan variables que podra ser requerida por todo el proyecto
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});


// Routes 
app.use(require("./routes/index.routes"));
app.use(require("./routes/notes.routes"));
app.use(require("./routes/users.routes"));


// Static Files
app.use(express.static(path.join(__dirname, "/public" )));  //LE DICE A NODE DONDE ESTA LA CARPETA PUBLIC

module.exports = app; //CODIGO PARA EXPORTAR CUANDO SE ES REQUERIDO
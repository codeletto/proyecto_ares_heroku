// CONTIENEN CONTROLADORES O FUNCIONES

const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {  //CUANDO PIDAN ALGO A LA RUTA INICIAL QUIERO QUE SE MANEJE CON UN "REQ" "RES"
    res.render("index")          //Y QUIERO QUE RENDERIZAR EL ARCHIVO LLAMADO INDEX
};

indexCtrl.renderAbout = (req, res) => {  //CUANDO PIDAN ALGO A LA RUTA INICIAL QUIERO QUE SE MANEJE CON UN "REQ" "RES"
    res.render("about")          //Y QUIERO QUE RENDERIZAR EL ARCHIVO LLAMADO INDEX
};
indexCtrl.renderDashboard = (req, res) => {  //CUANDO PIDAN ALGO A LA RUTA INICIAL QUIERO QUE SE MANEJE CON UN "REQ" "RES"
    res.render("dashboard")          //Y QUIERO QUE RENDERIZAR EL ARCHIVO LLAMADO INDEX
};
indexCtrl.renderDepositarRetirar = (req, res) => {  //CUANDO PIDAN ALGO A LA RUTA INICIAL QUIERO QUE SE MANEJE CON UN "REQ" "RES"
    res.render("depositar_retirar")          //Y QUIERO QUE RENDERIZAR EL ARCHIVO LLAMADO INDEX
};

indexCtrl.renderAmigos = (req, res) => {  //CUANDO PIDAN ALGO A LA RUTA INICIAL QUIERO QUE SE MANEJE CON UN "REQ" "RES"
    res.render("amigos")          //Y QUIERO QUE RENDERIZAR EL ARCHIVO LLAMADO INDEX
};

module.exports = indexCtrl;
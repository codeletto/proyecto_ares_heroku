const { Router } = require("express");
const router = Router();  //PODREMOS DEFINIR UNA URL

const { renderIndex, renderAbout, renderDashboard, renderDepositarRetirar, renderAmigos } = require("../controllers/index.controller");

router.get("/", renderIndex);

router.get("/about", renderAbout);

router.get("/src/views/dashboard.hbs", renderDashboard);

router.get("/src/views/depositar_retirar.hbs", renderDepositarRetirar);

router.get("/src/views/amigos.hbs", renderAmigos)


module.exports = router;
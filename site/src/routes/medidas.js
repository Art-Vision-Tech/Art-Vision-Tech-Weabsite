var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidasController");

router.get("/ultimas/:idAmbiente", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idAmbiente", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/kpi/:idAmbiente", function (req, res) {
    medidaController.buscarMedidasKpi(req, res);
})

module.exports = router;
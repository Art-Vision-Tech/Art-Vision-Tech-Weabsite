var express = require("express");
var router = express.Router();

var ambienteController = require("../controllers/ambienteController");

router.get("/:museuId", function (req, res) {
  ambienteController.buscarAmbientesPorMuseu(req, res);
});


module.exports = router;
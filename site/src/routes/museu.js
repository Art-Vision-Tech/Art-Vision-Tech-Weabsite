var express = require("express");
var router = express.Router();

var museuController = require("../controllers/museuController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
/* router.post("/cadastrar", function (req, res) {
    museuController.cadastrar(req, res);
}) */

router.get("/buscar", function (req, res) {
    museuController.buscarPorCnpj(req, res);
});

router.get("/buscar/:idMuseu", function (req, res) {
  museuController.buscarPorId(req, res);
});

router.get("/listar", function (req, res) {
  museuController.listar(req, res);
});

module.exports = router;
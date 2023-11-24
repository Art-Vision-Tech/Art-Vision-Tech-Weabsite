var ambienteModel = require("../models/ambienteModel");

function buscarAmbientesPorMuseu(req, res) {
  var idFuncionario = req.params.idFuncionario;

  ambienteModel.buscarAmbientesPorMuseu(idFuncionario).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar os Ambientes: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}


module.exports = {
  buscarAmbientesPorMuseu
}
var museuModel = require("../models/museuModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  museuModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  museuModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var idMuseu = req.params.idMuseu;

  museuModel.buscarPorId(idMuseu).then((resultado) => {
    res.status(200).json(resultado);
  });
}

/* function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;

  museuModel.buscarPorCnpj(cnpj).then((resultado) => {
    if (resultado.length > 0) {
      res
        .status(401)
        .json({ mensagem: `a museu com o cnpj ${cnpj} já existe` });
    } else {
      museuModel.cadastrar(razaoSocial, cnpj).then((resultado) => {
        res.status(201).json(resultado);
      });
    }
  });
} */

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  /* cadastrar, */
  listar,
};

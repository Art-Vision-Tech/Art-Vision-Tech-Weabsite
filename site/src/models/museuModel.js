var database = require("../database/config");

function buscarPorId(idMuseu) {
  var query = `select * from Museu where idMuseu = '${idMuseu}'`;

  return database.executar(query);
}

function listar() {
  var query = `select * from Museu`;

  return database.executar(query);
}

function buscarPorCnpj(cnpj) {
  var query = `select * from Museu where cnpj = '${cnpj}'`;

  return database.executar(query);
}

/* function cadastrar(razaoSocial, cnpj) {
  var query = `insert into Museu (razao_social, cnpj) values ('${razaoSocial}', '${cnpj}')`;

  return database.executar(query);
} */

module.exports = { buscarPorCnpj, buscarPorId, /* cadastrar, */ listar };

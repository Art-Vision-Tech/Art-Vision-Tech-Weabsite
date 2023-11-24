var database = require("../database/config");

function buscarAmbientesPorMuseu(museuId) {

  instrucaoSql = `select * from Ambiente a where fkMuseu = ${museuId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarAmbientesPorMuseu
}

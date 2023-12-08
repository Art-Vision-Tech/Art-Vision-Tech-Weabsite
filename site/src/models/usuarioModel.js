var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O Funcionario MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    SELECT idFuncionario, nome, cnpj, nomeMuseu, cpf, dataRegistro, email, FkMuseu as museuId FROM Funcionario JOIN Museu on idMuseu = fkMuseu WHERE email = '${email}' AND senha = '${senha}';    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nome, cpf, email, senha, fkMuseu) {
    console.log("ACESSEI O Funcionario MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha, cpf, fkMuseu);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Funcionario (nome, cpf, email, senha, FkMuseu) VALUES ('${nome}', '${cpf}', '${email}', '${senha}', ${fkMuseu});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarPerfil(nome, email, idFuncionario) {
    var instrucao = `
        
    UPDATE Funcionario set nome = '${nome}', email = '${email}' WHERE idFuncionario = ${idFuncionario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
module.exports = {
    autenticar,
    cadastrar,
    atualizarPerfil
};
var alertas = [];

function obterdados(idAmbiente) {
    fetch(`/medidas/tempo-real/${idAmbiente}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idAmbiente);
                    atualizarTabela(resposta,idAmbiente);
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${idAmbiente} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do ambiente p/ gráfico: ${error.message}`);
    });
}  

function alertar(resposta, idAmbiente) {
    var temp = resposta[0].temperatura;
    var umd = resposta[0].umidade;

    var limites = {
        quente: 28,
        ideal: 21,
        ruim: 12,
    };

    if (temp >= limites.quente) {
        classe_temperatura = 'status-card atencao';
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'status-card erro';
    }
    else if (temp < limites.quente && temp > limites.ruim) {
        classe_temperatura = 'status-card ok';
    }

    if (document.getElementById(`temp_ambiente_${idAmbiente}`) != null) {
        document.getElementById(`temp_ambiente_${idAmbiente}`).innerHTML = `Temperatura atual: ${temp}°C`;
        document.getElementById(`temp_tabela${idAmbiente}`).innerHTML = `${temp}º`;
    }

    if (document.getElementById(`umd_ambiente_${idAmbiente}`) != null) {
        document.getElementById(`umd_ambiente_${idAmbiente}`).innerHTML = `Umidade atual: ${umd}%`;
    }

    if (document.getElementById(`temp_tabela${idAmbiente}`) != null) {
        document.getElementById(`temp_tabela${idAmbiente}`).innerHTML = `${temp}º`;
        document.getElementById(`umd_tabela${idAmbiente}`).innerHTML = `${umd}%`;
    }

    if (document.getElementById(`card_${idAmbiente}`)) {
        card = document.getElementById(`card_${idAmbiente}`)
        card.className = classe_temperatura;
    }
}

/* function exibirAlerta(temp, idAmbiente, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idAmbiente == idAmbiente);

    if (indice >= 0) {
        alertas[indice] = { idAmbiente, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idAmbiente, temp, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards();
}

function removerAlerta(idAmbiente) {
    alertas = alertas.filter(item => item.idAmbiente != idAmbiente);
    exibirCards();
}   */

/* function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += alertaEmDiv(mensagem);
    }
} */

/* function alertaEmDiv({ idAmbiente, temp, grauDeAviso, grauDeAvisoCor }) {

    var nome_ambiente = JSON.parse(sessionStorage.AMBIENTE).find(item => item.id == idAmbiente).nome_ambiente;
    return `
    <div class="mensagem-alarme">
        <div class="informacao">
            <div class="${grauDeAvisoCor}">&#12644;</div> 
            <h3>${nome_ambiente} está em estado de ${grauDeAviso}!</h3>
            <small>Temperatura ${temp}.</small>   
        </div>
        <div class="alarme-sino"></div>
    </div>
    `;
}  */



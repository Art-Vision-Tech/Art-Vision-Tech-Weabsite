var alertas = [];

function obterdados(idAmbiente) {
    fetch(`/medidas/tempo-real/${idAmbiente}`)
        .then(resposta => {
            if (resposta.status == 200) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    exibirRegistros(resposta, idAmbiente);
                    calcularIp(resposta, idAmbiente);
                    cardHistoricoAlerta(resposta, idAmbiente);
                });
            } else {
                console.error(`Nenhum dado encontrado para o id ${idAmbiente} ou erro na API`);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do ambiente p/ gráfico: ${error.message}`);
    });
}  

function calcularIp(resposta, idAmbiente) {
    var temp = resposta[0].temperatura;
    var umd = resposta[0].umidade;
    var ip = Math.exp((95220 - 134.9 * umd) / (8.314 * (temp + 273.15)) + (0.0284 * umd) - 28.023) / 365;
    var limites_ip = {
        bom: 70,
        normal: 45,
    };

    console.log("Valor ip:" + parseInt(ip));

    if (ip >= limites_ip.bom) {
        classe_status = 'status-card bom';
    } else if (ip >= limites_ip.normal && ip <= limites_ip.bom) {
        classe_status = 'status-card normal';
    } else {
        classe_status = 'status-card ruim';
    }

    if (document.getElementById(`card_${idAmbiente}`)) {
        card = document.getElementById(`card_${idAmbiente}`)
        card.className = classe_status;
    }
}

function exibirRegistros(resposta, idAmbiente) {
    var temp = resposta[0].temperatura;
    var umd = resposta[0].umidade;
    var ip = Math.exp((95220 - 134.9 * umd) / (8.314 * (temp + 273.15)) + (0.0284 * umd) - 28.023) / 365;

    if(temp > 24 || temp < 20) {
        classe_temperatura = 'alerta'
    } else {
        classe_temperatura = 'ok'
    }

    if(umd > 60|| umd < 45) {
        classe_umd = 'alerta'
    } else {
        classe_umd = 'ok'
    }

    if (document.getElementById(`temp_ambiente_${idAmbiente}`) != null && document.getElementById(`umd_ambiente_${idAmbiente}`) != null) {
        const textoTemp = document.getElementById(`temp_ambiente_${idAmbiente}`)
        const textoUmd = document.getElementById(`umd_ambiente_${idAmbiente}`)
        textoTemp.innerHTML = ` ${temp}°C`;
        textoTemp.className = classe_temperatura;
        textoUmd.innerHTML = ` ${umd}%`;
        textoUmd.className = classe_umd;
        document.getElementById(`ip_ambiente_${idAmbiente}`).innerHTML = `${parseInt(ip)} anos`;
        document.getElementById(`mensagem_status_${idAmbiente}`).innerHTML = `Temperatura ${temp} | Umidade ${umd} | IP ${parseInt(ip)}`
    }



    if (document.getElementById(`temp_tabela${idAmbiente}`) != null) {
        document.getElementById(`temp_tabela${idAmbiente}`).innerHTML = `${temp}º`;
        document.getElementById(`umd_tabela${idAmbiente}`).innerHTML = `${umd}%`;
    }
}

function cardHistoricoAlerta(resposta, idAmbiente) {
    var listaAlertas = [];
    var listaHorario = []; 
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        if(registro.temperatura > 24 || registro.temperatura < 20) {
            listaHorario.push(registro.momento_grafico);
            listaAlertas.push(registro.temperatura);
        } else{
            console.log("Não tem alerta")
        }
    }

    console.log(listaAlertas)
    console.log(listaHorario)

    var elementoHistoricoAlerta = document.getElementById(`historicoAlerta${idAmbiente}`);

    for (var i = 0; i < listaAlertas.length; i++) {
        var alertaAtual = listaAlertas[i];
        var horarioAtual = listaHorario[i];
        elementoHistoricoAlerta.innerHTML += `
        <div class="log-mensagem">
            <i class="fa-solid fa-circle-exclamation" style="color: #ff1414;"></i>
                <p> Nível de temperatura registrado “+${alertaAtual}º” do que esperado
                (${horarioAtual})
            </p>
        </div>`
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



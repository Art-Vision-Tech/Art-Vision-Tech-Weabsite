var alertas = [];

function alertar(resposta, idAmbiente) {
    var temp = resposta[0].temperatura;

    var grauDeAviso = '';

    var limites = {
        muito_quente: 23,
        quente: 22,
        ideal: 20,
        frio: 10,
        muito_frio: 5
    };

    var classe_temperatura = 'cor-alerta';

    if (temp >= limites.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(temp, idAmbiente, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(temp, idAmbiente, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.quente && temp > limites.frio) {
        classe_temperatura = 'cor-alerta ideal';
        removerAlerta(idAmbiente);
    }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(temp, idAmbiente, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(temp, idAmbiente, grauDeAviso, grauDeAvisoCor)
    }

    var card;

    if (document.getElementById(`temp_ambiente_${idAmbiente}`) != null) {
        document.getElementById(`temp_ambiente_${idAmbiente}`).innerHTML = temp + "°C";
    }

    if (document.getElementById(`card_${idAmbiente}`)) {
        card = document.getElementById(`card_${idAmbiente}`)
        card.className = classe_temperatura;
    }
}

function exibirAlerta(temp, idAmbiente, grauDeAviso, grauDeAvisoCor) {
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
} 

function exibirCards() {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += alertaEmDiv(mensagem);
    }
}

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



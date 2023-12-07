var alertas = [];
var indice = 0;

function obterdados(idAmbiente) {
  fetch(`/medidas/tempo-real/${idAmbiente}`)
    .then((resposta) => {
      console.log("ta caindo aqui dentro");
      if (resposta.status == 200) {
        resposta.json().then((resposta) => {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

          exibirRegistros(resposta, idAmbiente);
          calcularIp(resposta, idAmbiente);
          cardHistoricoAlerta(resposta, idAmbiente);
        });
      } else {
        console.error(
          `Nenhum dado encontrado para o id ${idAmbiente} ou erro na API`
        );
      }
    })
    .catch(function (error) {
      console.error(
        `Erro na obtenção dos dados do ambiente p/ gráfico: ${error.message}`
      );
    });
}

function calcularIp(resposta, idAmbiente) {
  var temp = resposta[0].temperatura;
  var umd = resposta[0].umidade;
  var ip =
    Math.exp(
      (95220 - 134.9 * umd) / (8.314 * (temp + 273.15)) + 0.0284 * umd - 28.023
    ) / 365;
  var limites_ip = {
    bom: 70,
    normal: 45,
  };

  console.log("Valor ip:" + parseInt(ip));

  if (ip >= limites_ip.bom) {
    classe_status = "status-card bom";
  } else if (ip >= limites_ip.normal && ip <= limites_ip.bom) {
    classe_status = "status-card normal";
  } else {
    classe_status = "status-card ruim";
  }

  if (document.getElementById(`card_${idAmbiente}`)) {
    card = document.getElementById(`card_${idAmbiente}`);
    card.className = classe_status;
  }
}

function exibirRegistros(resposta, idAmbiente) {
  var temp = resposta[0].temperatura;
  var umd = resposta[0].umidade;
  var ip =
    Math.exp(
      (95220 - 134.9 * umd) / (8.314 * (temp + 273.15)) + 0.0284 * umd - 28.023
    ) / 365;

  if (temp > 24 || temp < 20) {
    classe_temperatura = "alerta";
  } else {
    classe_temperatura = "ok";
  }

  if (umd > 60 || umd < 45) {
    classe_umd = "alerta";
  } else {
    classe_umd = "ok";
  }

  if (ip >= 70) {
    classe_ip = "ok";
  } else if (ip >= 45 && ip <= 70) {
    classe_ip = "ideal";
  } else {
    classe_ip = "alerta";
  }

  if (
    document.getElementById(`temp_ambiente_${idAmbiente}`) != null &&
    document.getElementById(`umd_ambiente_${idAmbiente}`) != null
  ) {
    const textoTemp = document.getElementById(`temp_ambiente_${idAmbiente}`);
    const textoUmd = document.getElementById(`umd_ambiente_${idAmbiente}`);
    textoTemp.innerHTML = ` ${temp}°C`;
    textoTemp.className = classe_temperatura;
    textoUmd.innerHTML = ` ${umd}%`;
    textoUmd.className = classe_umd;
    const textoIp = document.getElementById(`ip_ambiente_${idAmbiente}`);
    textoIp.innerHTML = `${parseInt(ip)} anos`;
    textoIp.className = classe_ip;
    document.getElementById(
      `mensagem_status_${idAmbiente}`
    ).innerHTML = `Temperatura ${temp} | Umidade ${umd} | IP ${parseInt(ip)}`;
  }

  if (document.getElementById(`temp_tabela${idAmbiente}`) != null) {
    document.getElementById(`temp_tabela${idAmbiente}`).innerHTML = `${temp}º`;
    document.getElementById(`umd_tabela${idAmbiente}`).innerHTML = `${umd}%`;
  }
}

function cardHistoricoAlerta(resposta, idAmbiente) {
  var listaAlertasTemp = [];
  var listaAlertasUmd = [];
  var listaHorario = [];

  indice++;

  var elementoHistoricoAlerta = document.getElementById(
    `historicoAlerta${idAmbiente}`
  );

  console.log("resposta", resposta);

  for (i = 0; i < resposta.length; i++) {
    var registro = resposta[i];
    if (registro.temperatura > 24 || registro.temperatura < 20) {
      listaHorario.push(registro.momento_grafico);
      listaAlertasTemp.push(registro.temperatura);
      var alertaAtual = listaAlertasTemp[i];
      var horarioAtual = listaHorario[i];

      var textoDiferenca = ``;

      if (alertaAtual > 24) {
        alertaAtual -= 24;
        textoDiferenca = `“+${alertaAtual}º”`;
      } else if (alertaAtual < 20) {
        alertaAtual -= 20;
        textoDiferenca = `“${alertaAtual}º”`;
      }

        elementoHistoricoAlerta.innerHTML += `
                <div class="log-mensagem">
                    <i class="fa-solid fa-circle-exclamation" style="color: #ff1414;"></i>
                        <p> Nível de temperatura registrado ${textoDiferenca} do que esperado
                        (${horarioAtual})
                    </p>
                </div>`;

    }
    
    if (registro.umidade > 60 || registro.umidade < 45) {
         listaHorario.push(registro.momento_grafico);
         listaAlertasUmd.push(registro.umidade);
         var alertaAtual = listaAlertasUmd[i];
         var horarioAtual = listaHorario[i];

         var textoDiferenca = ``

         if (alertaAtual > 60) {
             alertaAtual -= 60
             textoDiferenca = `“+${alertaAtual}º”`
         } else if (alertaAtual < 45) {
             alertaAtual -= 45
             textoDiferenca = `“${alertaAtual}º”`
         }

         elementoHistoricoAlerta.innerHTML += `
         <div class="log-mensagem">
             <i class="fa-solid fa-circle-exclamation" style="color: #ff1414;"></i>
                 <p> Nível de umidade registrado ${textoDiferenca} do que esperado
                 (${horarioAtual})
             </p>
         </div>`
     }
  }



  console.log("indice",indice)
  if (indice && indice >= 10) {
    elementoHistoricoAlerta.innerHTML = ``;
    indice = 0;
  }

  console.log("Foi");

  console.log(listaAlertasUmd);
  console.log(listaAlertasTemp);
  console.log(listaHorario);
}

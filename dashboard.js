/* ===================================== */
/* DASHBOARD STRATUS BET */
/* ===================================== */

import { db } from "./firebase.js";

import {

    doc,
    collection,
    onSnapshot,
    getDocs,
    writeBatch

}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* ===================================== */
/* REFERÊNCIAS */
/* ===================================== */

const estatisticasRef =
doc(db,"estatisticas","jogo");

const jogadoresRef =
collection(db,"jogadores");

const IDS_IGNORADOS =
["exemplo"];

/* ===================================== */
/* ELEMENTOS */
/* ===================================== */

const elementos = {

    jogadores:
    document.getElementById("jogadores"),

    acessos:
    document.getElementById("acessos"),

    partidas:
    document.getElementById("partidas"),

    ganhos:
    document.getElementById("ganhos"),

    derrotas:
    document.getElementById("derrotas"),

    jackpots:
    document.getElementById("jackpots"),

    gameOver:
    document.getElementById("gameOver"),

    jogarNovamente:
    document.getElementById("jogarNovamente"),

    telaFinal:
    document.getElementById("telaFinal"),

    sextaRodada:
    document.getElementById("sextaRodada"),

    mediaPartidas:
    document.getElementById("mediaPartidas"),

    taxaVitoria:
    document.getElementById("taxaVitoria"),

    taxaJackpot:
    document.getElementById("taxaJackpot"),

    taxaGameOver:
    document.getElementById("taxaGameOver"),

    taxaConversao:
    document.getElementById("taxaConversao"),

    topUsuarios:
    document.getElementById("topUsuarios"),

    limparDados:
    document.getElementById("limparDados"),

    barChart:
    document.getElementById("barChart"),

    pieChart:
    document.getElementById("pieChart"),

    ultimaAtualizacao:
    document.getElementById("lastUpdate")

};

/* ===================================== */
/* ANIMAÇÃO */
/* ===================================== */

function animar(id){

    const el =
    document.getElementById(id);

    if(!el) return;

    const card =
    el.closest(".card");

    if(!card) return;

    card.animate([

        {

            transform:"scale(1)"

        },

        {

            transform:"scale(1.05)"

        },

        {

            transform:"scale(1)"

        }

    ],{

        duration:350

    });

}

/* ===================================== */
/* ATUALIZAR CARD */
/* ===================================== */

function atualizar(id,valor){

    const el =
    elementos[id];

    if(!el) return;

    if(el.textContent != valor){

        el.textContent = valor;

        animar(id);

    }

}

/* ===================================== */
/* PORCENTAGEM */
/* ===================================== */

function porcentagem(a,b){

    if(!b) return "0%";

    return ((a/b)*100)
    .toFixed(1)+"%";

}

/* ===================================== */
/* ÚLTIMA ATUALIZAÇÃO */
/* ===================================== */

function atualizarHora(){

    elementos.ultimaAtualizacao.innerHTML =

    "Atualizado às "

    +

    new Date()

    .toLocaleTimeString();

}

function formatarJogadorId(id){

    if(id.length <= 12) return id;

    return id.slice(0,8) + "..." + id.slice(-4);

}

function renderizarTopUsuarios(jogadores){

    if(!elementos.topUsuarios) return;

    const ranking =
    jogadores
    .map((jogador)=>{

        const dados =
        jogador.data();

        return {
            id:jogador.id,
            acessos:dados.acessos ?? 1,
            jogarNovamente:dados.jogarNovamente ?? 0
        };

    })
    .sort((a,b)=>b.acessos - a.acessos)
    .slice(0,3);

    elementos.topUsuarios.innerHTML = "";

    if(!ranking.length){

        const vazio =
        document.createElement("div");

        vazio.className =
        "empty-state";

        vazio.textContent =
        "Nenhum usuario registrado ainda.";

        elementos.topUsuarios.appendChild(vazio);

        return;

    }

    ranking.forEach((usuario,index)=>{

        const item =
        document.createElement("div");

        item.className =
        "top-user";

        const posicao =
        document.createElement("div");

        posicao.className =
        "top-position";

        posicao.textContent =
        index + 1;

        const nome =
        document.createElement("div");

        nome.className =
        "top-name";

        const titulo =
        document.createElement("strong");

        titulo.textContent =
        "Usuario " + formatarJogadorId(usuario.id);

        const detalhe =
        document.createElement("small");

        detalhe.textContent =
        usuario.id;

        nome.appendChild(titulo);
        nome.appendChild(detalhe);

        const metricas =
        document.createElement("div");

        metricas.className =
        "top-metrics";

        const acessos =
        document.createElement("div");

        acessos.className =
        "top-access";

        acessos.innerHTML =
        usuario.acessos + "<small>acessos</small>";

        const jogarNovamente =
        document.createElement("div");

        jogarNovamente.className =
        "top-access top-replay";

        jogarNovamente.innerHTML =
        usuario.jogarNovamente + "<small>jogar novamente</small>";

        metricas.appendChild(acessos);
        metricas.appendChild(jogarNovamente);

        item.appendChild(posicao);
        item.appendChild(nome);
        item.appendChild(metricas);

        elementos.topUsuarios.appendChild(item);

    });

}

let graficoBarras = null;

let graficoPizza = null;

function numero(valor){

    return valor ?? 0;

}

function atualizarGraficos(dados){

    if(typeof Chart === "undefined") return;

    if(!elementos.barChart || !elementos.pieChart) return;

    const labelsBarras =
    [
        "Acessos",
        "Partidas",
        "Ganhos",
        "Derrotas",
        "Jackpots",
        "Game Over",
        "Jogar Novamente",
        "Tela Final"
    ];

    const valoresBarras =
    [
        numero(dados.acessos),
        numero(dados.partidas),
        numero(dados.ganhos),
        numero(dados.derrotas),
        numero(dados.jackpots),
        numero(dados.gameOver),
        numero(dados.jogarNovamente),
        numero(dados.telaFinal)
    ];

    const cores =
    [
        "#0891b2",
        "#16a34a",
        "#b7791f",
        "#dc2626",
        "#ca8a04",
        "#ef4444",
        "#ea580c",
        "#7c3aed"
    ];

    if(!graficoBarras){

        graficoBarras =
        new Chart(elementos.barChart,{
            type:"bar",
            data:{
                labels:labelsBarras,
                datasets:[{
                    label:"Total",
                    data:valoresBarras,
                    backgroundColor:cores,
                    borderRadius:6
                }]
            },
            options:{
                responsive:true,
                maintainAspectRatio:false,
                plugins:{
                    legend:{
                        display:false
                    }
                },
                scales:{
                    y:{
                        beginAtZero:true,
                        ticks:{
                            precision:0
                        }
                    }
                }
            }
        });

    }

    else{

        graficoBarras.data.datasets[0].data =
        valoresBarras;

        graficoBarras.update();

    }

    const labelsPizza =
    [
        "Ganhos",
        "Derrotas",
        "Jackpots",
        "Game Over"
    ];

    const valoresPizza =
    [
        numero(dados.ganhos),
        numero(dados.derrotas),
        numero(dados.jackpots),
        numero(dados.gameOver)
    ];

    if(!graficoPizza){

        graficoPizza =
        new Chart(elementos.pieChart,{
            type:"doughnut",
            data:{
                labels:labelsPizza,
                datasets:[{
                    data:valoresPizza,
                    backgroundColor:[
                        "#16a34a",
                        "#dc2626",
                        "#ca8a04",
                        "#ef4444"
                    ],
                    borderColor:"#ffffff",
                    borderWidth:3
                }]
            },
            options:{
                responsive:true,
                maintainAspectRatio:false,
                plugins:{
                    legend:{
                        position:"bottom"
                    }
                }
            }
        });

    }

    else{

        graficoPizza.data.datasets[0].data =
        valoresPizza;

        graficoPizza.update();

    }

}

function estatisticasZeradas(){

    return {
        acessos:0,
        partidas:0,
        ganhos:0,
        derrotas:0,
        jackpots:0,
        gameOver:0,
        jogarNovamente:0,
        telaFinal:0,
        sextaRodada:0
    };

}

async function limparDadosDashboard(){

    const confirmado =
    confirm(
        "Tem certeza que deseja limpar todos os dados do dashboard? Esta acao nao pode ser desfeita."
    );

    if(!confirmado) return;

    elementos.limparDados.disabled =
    true;

    elementos.limparDados.textContent =
    "Limpando...";

    try{

        const snapshot =
        await getDocs(jogadoresRef);

        let batch =
        writeBatch(db);

        let operacoes =
        0;

        for(const jogador of snapshot.docs){

            batch.delete(jogador.ref);
            operacoes++;

            if(operacoes === 450){

                await batch.commit();

                batch =
                writeBatch(db);

                operacoes =
                0;

            }

        }

        batch.set(
            estatisticasRef,
            estatisticasZeradas()
        );

        await batch.commit();

        alert("Dados limpos com sucesso.");

    }

    catch(erro){

        console.error("Erro ao limpar dados:",erro);

        alert("Nao foi possivel limpar os dados. Confira as permissoes do Firebase.");

    }

    finally{

        elementos.limparDados.disabled =
        false;

        elementos.limparDados.textContent =
        "Limpar dados";

    }

}

if(elementos.limparDados){

    elementos.limparDados.addEventListener(
        "click",
        limparDadosDashboard
    );

}

/* ===================================== */
/* JOGADORES */
/* ===================================== */

let totalJogadores = 0;

let totalAcessosJogadores = 0;

let dadosEstatisticas = {};

let jogadoresCarregados = false;

function jogadorValido(docSnap){

    return !IDS_IGNORADOS.includes(docSnap.id);

}

function recalcularMetricas(){

    atualizar(
        "mediaPartidas",
        totalJogadores
        ?
        ((dadosEstatisticas.partidas ?? 0) / totalJogadores)
        .toFixed(2)
        :
        "0"
    );

    atualizar(
        "taxaGameOver",
        porcentagem(
            dadosEstatisticas.gameOver ?? 0,
            totalJogadores
        )
    );

    atualizar(
        "taxaConversao",
        porcentagem(
            dadosEstatisticas.telaFinal ?? 0,
            totalJogadores
        )
    );

}

onSnapshot(

    jogadoresRef,

    (snapshot)=>{

        jogadoresCarregados =
        true;

        const jogadores =
        snapshot.docs.filter(jogadorValido);

        renderizarTopUsuarios(jogadores);

        totalJogadores =
        jogadores.length;

        totalAcessosJogadores =
        jogadores.reduce((total,jogador)=>{

            const dados =
            jogador.data();

            return total + (dados.acessos ?? 1);

        },0);

        atualizar(
            "jogadores",
            totalJogadores
        );

        atualizar(
            "acessos",
            totalAcessosJogadores
        );

        recalcularMetricas();

        atualizarHora();

    }

);

/* ===================================== */
/* ESTATÍSTICAS */
/* ===================================== */

onSnapshot(

estatisticasRef,

(docSnap)=>{

    if(!docSnap.exists()) return;

    const dados =
    docSnap.data();

    dadosEstatisticas =
    dados;

    atualizarGraficos(dados);

    if(!jogadoresCarregados){

        atualizar(
            "acessos",
            dados.acessos ?? 0
        );

    }

    atualizar(
        "partidas",
        dados.partidas ?? 0
    );

    atualizar(
        "ganhos",
        dados.ganhos ?? 0
    );

    atualizar(
        "derrotas",
        dados.derrotas ?? 0
    );

    atualizar(
        "jackpots",
        dados.jackpots ?? 0
    );

    atualizar(
        "gameOver",
        dados.gameOver ?? 0
    );

    atualizar(
        "jogarNovamente",
        dados.jogarNovamente ?? 0
    );

    atualizar(
        "telaFinal",
        dados.telaFinal ?? 0
    );

    atualizar(
        "sextaRodada",
        dados.sextaRodada ?? 0
    );

    /* ============================= */

    /* MÉTRICAS */

    /* ============================= */

    atualizar(

        "taxaVitoria",

        porcentagem(

            dados.ganhos,

            dados.partidas

        )

    );

    atualizar(

        "taxaJackpot",

        porcentagem(

            dados.jackpots,

            dados.partidas

        )

    );

    recalcularMetricas();

    atualizarHora();

});

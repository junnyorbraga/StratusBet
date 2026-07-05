/* ===================================== */
/* STRATUS BET - FIREBASE */
/* ===================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

import {

    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    serverTimestamp

} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

/* ===================================== */
/* CONFIGURAÇÃO FIREBASE */
/* ===================================== */

const firebaseConfig = {

    apiKey: "SUA_API_KEY",
    authDomain: "stratus-bet.firebaseapp.com",
    projectId: "stratus-bet",
    storageBucket: "stratus-bet.firebasestorage.app",
    messagingSenderId: "1076225464704",
    appId: "1:1076225464704:web:8b717965e838d67a024965"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

/* ===================================== */
/* CONFIGURAÇÕES */
/* ===================================== */

const DEBUG = true;

/* ===================================== */
/* COLEÇÕES */
/* ===================================== */

const COLECAO = {

    JOGADORES: "jogadores",

    ESTATISTICAS: "estatisticas"

};

/* ===================================== */
/* DOCUMENTOS */
/* ===================================== */

const DOCUMENTO = {

    JOGO: "jogo"

};

/* ===================================== */
/* CAMPOS */
/* ===================================== */

const CAMPO = {

    ACESSOS: "acessos",

    PARTIDAS: "partidas",

    GANHOS: "ganhos",

    DERROTAS: "derrotas",

    JACKPOTS: "jackpots",

    GAMEOVER: "gameOver",

    TELAFINAL: "telaFinal",

    JOGARNOVAMENTE: "jogarNovamente",

    SEXTARODADA: "sextaRodada"

};

/* ===================================== */
/* LOG */
/* ===================================== */

function log(...msg){

    if(DEBUG){

        console.log(...msg);

    }

}

/* ===================================== */
/* PLAYER ID */
/* ===================================== */

function getPlayerId(){

    let id = sessionStorage.getItem("playerId");

    if(!id){

        id = crypto.randomUUID();

        sessionStorage.setItem("playerId",id);

    }

    return id;

}

/* ===================================== */
/* REFERÊNCIAS */
/* ===================================== */

function jogadorRef(){

    return doc(

        db,

        COLECAO.JOGADORES,

        getPlayerId()

    );

}

function estatisticaRef(){

    return doc(

        db,

        COLECAO.ESTATISTICAS,

        DOCUMENTO.JOGO

    );

}

/* ===================================== */
/* FUNÇÃO PRIVADA */
/* ATUALIZA UMA ESTATÍSTICA */
/* ===================================== */

async function incrementar(campo){

    try{

        await updateDoc(

            jogadorRef(),

            {

                [campo]: increment(1),

                ultimaVisita: serverTimestamp()

            }

        );

        await updateDoc(

            estatisticaRef(),

            {

                [campo]: increment(1)

            }

        );

        log("✔",campo,"atualizado");

    }

    catch(erro){

        console.error("Firebase:",erro);

    }

}

/* ===================================== */
/* REGISTRAR ACESSO */
/* ===================================== */

export async function registrarAcesso(){

    const ref = jogadorRef();

    const snap = await getDoc(ref);

    if(!snap.exists()){

        await setDoc(ref,{

            primeiraVisita: serverTimestamp(),

            ultimaVisita: serverTimestamp(),

            acessos:1,

            partidas:0,

            ganhos:0,

            derrotas:0,

            jackpots:0,

            gameOver:0,

            telaFinal:0,

            jogarNovamente:0,

            sextaRodada:0

        });

        log("✔ Novo jogador");

    }

    else{

        await updateDoc(ref,{

            acessos: increment(1),

            ultimaVisita: serverTimestamp()

        });

        log("✔ Jogador existente");

    }

    await updateDoc(

        estatisticaRef(),

        {

            acessos: increment(1)

        }

    );

}

/* ===================================== */
/* EVENTOS DO JOGO */
/* ===================================== */

export async function registrarPartida(){

    await incrementar(CAMPO.PARTIDAS);

}

export async function registrarGanho(){

    await incrementar(CAMPO.GANHOS);

}

export async function registrarDerrota(){

    await incrementar(CAMPO.DERROTAS);

}

export async function registrarJackpot(){

    await incrementar(CAMPO.JACKPOTS);

}

export async function registrarGameOver(){

    await incrementar(CAMPO.GAMEOVER);

}

export async function registrarTelaFinal(){

    await incrementar(CAMPO.TELAFINAL);

}

export async function registrarJogarNovamente(){

    await incrementar(CAMPO.JOGARNOVAMENTE);

}

export async function registrarSextaRodada(){

    await incrementar(CAMPO.SEXTARODADA);

}

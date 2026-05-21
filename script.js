/* ===================================== */
/* VARIÁVEIS GLOBAIS */
/* ===================================== */

/* Quantidade de moedas */
let coins = 100;

/* Número da rodada */
let rodada = 0;

/* Emojis possíveis */
const emojis = [
"7️⃣",
"🧴",
"💊",
"💎",
"💰",
"🍀",
"🎰"
];

/* ===================================== */
/* RETORNA EMOJI ALEATÓRIO */
/* ===================================== */

function emoji(){

    return emojis[
    Math.floor(Math.random()*emojis.length)
    ];

}

/* ===================================== */
/* ALTERA MENSAGEM NA TELA */
/* ===================================== */

function setMessage(text,classe){

    document.getElementById("message").innerHTML =
    `<span class="${classe}">${text}</span>`;

}

/* ===================================== */
/* SISTEMA DE SONS */
/* ===================================== */

function playSounds(type){

    let audio;

    /* Escolhe áudio */

    if(type=="spin"){
        audio = document.getElementById("spinSound");
    }

    if(type=="win"){
        audio = document.getElementById("winSound");
    }

    if(type=="lose"){
        audio = document.getElementById("loseSound");
    }

    if(type=="jackpot"){
        audio = document.getElementById("jackpotSound");
    }

    /* Executa áudio */

    if(audio){

        /* Reinicia áudio */
        audio.pause();

        audio.currentTime = 0;

        /* Toca áudio */
        audio.play().catch(e=>{

            console.log("Som bloqueado");

        });

    }

}

/* ===================================== */
/* ANIMAÇÃO DOS SLOTS */
/* ===================================== */

function spinAnimation(){

    /* Som */
    playSounds("spin");

    /* Captura elementos */
    const r1 = document.getElementById("r1");
    const r2 = document.getElementById("r2");
    const r3 = document.getElementById("r3");

    /* Adiciona animação */
    r1.classList.add("spin");
    r2.classList.add("spin");
    r3.classList.add("spin");

    /* Troca emojis rapidamente */
    let interval = setInterval(()=>{

        r1.innerHTML = emoji();
        r2.innerHTML = emoji();
        r3.innerHTML = emoji();

    },100);

    /* Para animação */
    setTimeout(()=>{

        clearInterval(interval);

        r1.classList.remove("spin");
        r2.classList.remove("spin");
        r3.classList.remove("spin");

        /* Chama resultado */
        result();

    },1500);

}

/* ===================================== */
/* FUNÇÃO PRINCIPAL */
/* ===================================== */

function play(){

    /* Desativa botão */
    document.getElementById("playBtn").disabled = true;

    /* Soma rodada */
    rodada++;

    /* Inicia animação */
    spinAnimation();

}

/* ===================================== */
/* RESULTADOS */
/* ===================================== */

function result(){

    /* Captura slots */
    const r1 = document.getElementById("r1");
    const r2 = document.getElementById("r2");
    const r3 = document.getElementById("r3");

    /* ================================= */
    /* PRIMEIRAS RODADAS = GANHA */
    /* ================================= */

    if(rodada <= 3){

        /* Mostra jackpot */
        r1.innerHTML = "🧴";
        r2.innerHTML = "🧴";
        r3.innerHTML = "🧴";

        /* Valores dos prêmios */
        let premio = [50,120,300][rodada-1];

        /* Soma moedas */
        coins += premio;

        /* Atualiza tela */
        document.getElementById("coins").innerHTML = coins;

        /* JACKPOT */

        if(rodada == 3){

            playSounds("jackpot");

            setMessage(
            `🎉 JACKPOT! +${premio} moedas`,
            "green"
            );

            /* Vibração */
            navigator.vibrate?.([200,100,200]);

        }

        /* Vitória comum */

        else{

            playSounds("win");

            setMessage(
            `✅ Você ganhou +${premio} moedas`,
            "green"
            );

        }

    }

    /* ================================= */
    /* QUASE GANHOU */
    /* ================================= */

    else if(rodada == 4){

        r1.innerHTML = "7️⃣";
        r2.innerHTML = "7️⃣";
        r3.innerHTML = "💀";

        /* Remove moedas */
        coins -= 200;

        /* Atualiza tela */
        document.getElementById("coins").innerHTML = coins;

        /* Som derrota */
        playSounds("lose");

        /* Mensagem */
        setMessage(
        `😨 Quase... você perdeu 200 moedas`,
        "yellow"
        );

    }

    /* ================================= */
    /* DERROTA FINAL */
    /* ================================= */

    else{

        r1.innerHTML = "💀";
        r2.innerHTML = "💀";
        r3.innerHTML = "💀";

        /* Zera moedas */
        coins = 0;

        /* Atualiza tela */
        document.getElementById("coins").innerHTML = coins;

        /* Som derrota */
        playSounds("lose");

        /* Mensagem */
        setMessage(
        `❌ VOCÊ PERDEU TUDO`,
        "red"
        );

        /* Vibração */
        navigator.vibrate?.([300,100,300]);

        /* Fundo vermelho */
        document.body.classList.add("redFlash");

        /* Mostra tela final */
        setTimeout(()=>{

            /* Esconde jogo */
            document.getElementById("gameScreen")
            .style.display="none";

            /* Mostra tela final */
            document.getElementById("warningScreen")
            .style.display="flex";

        },2500);

    }

    /* Reativa botão */
    document.getElementById("playBtn").disabled = false;

}
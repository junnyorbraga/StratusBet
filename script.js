/* ===================================== */
/* VARIÁVEIS GLOBAIS */
/* ===================================== */

/* Música ambiente */

const bgMusic =
document.getElementById("bgMusic");

/* Volume baixo */
bgMusic.volume = 0.15;

/* Quantidade de moedas */
let coins = 100;

/* Número da rodada */
let rodada = 0;

/* Emojis possíveis */
const emojis = [
"🎱",
"🦊",
"🧴",
"💊",
"🍒",
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

    if(type=="count"){
        audio = document.getElementById("countSound");
    }

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
    if(type=="gameover"){
    audio = document.getElementById("gameOverSound");   
    }

    /* Executa áudio */

    if(audio){

    /* NÃO reinicia música ambiente */

    if(type != "bg"){

        audio.pause();

        audio.currentTime = 0;

    }

    /* Volume específico */

    if(type == "spin"){

        audio.volume = 0.6;

    }

    else{

        audio.volume = 1;

    }

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

    /* SOM GIRO */
    const spinAudio =
    document.getElementById("spinSound");

    /* Reinicia */
    spinAudio.pause();
    spinAudio.currentTime = 0;

    /* Volume */
    spinAudio.volume = 0.7;

    /* Toca */
    spinAudio.play().catch(()=>{});

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

        /* PARA SOM GIRO */
        spinAudio.pause();
        spinAudio.currentTime = 0;

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

    /* REMOVE TEXTO INICIAL */
    /* A PARTIR DA SEGUNDA RODADA */
    if(rodada >= 2){

        document.querySelector(".subtitle")
        .style.display = "none";

    }

     /* Inicia música */
     if(bgMusic.paused){
     bgMusic.play();}

    /* Inicia animação */
    spinAnimation();

}

/* ===================================== */
/* RESULTADOS */
/* ===================================== */

async function result(){

    const r1 = document.getElementById("r1");
    const r2 = document.getElementById("r2");
    const r3 = document.getElementById("r3");

    /* ================================= */
    /* RESULTADO ALEATÓRIO DOS SLOTS */
    /* ================================= */

    /* Emojis sorteados */
    let e1 = emoji();
    let e2 = emoji();
    let e3 = emoji();

    /* Define nos slots */
    r1.innerHTML = e1;
    r2.innerHTML = e2;
    r3.innerHTML = e3;

    /* Vitória somente com 3 🍀 */
    let ganhou =
    e1 == "🍀" &&
    e2 == "🍀" &&
    e3 == "🍀";

    /* ================================= */
    /* DEFINE SE GANHA OU PERDE */
    /* ================================= */
    //let ganhou =
    //Math.random() < 0.5;

    /* ================================= */
    /* GANHOU */
    /* ================================= */

    if(ganhou){

        // r1.innerHTML = "🍀";
        // r2.innerHTML = "🍀";
        // r3.innerHTML = "🍀";

        /* Valor aleatório */

       let premio =
        Math.floor(Math.random() * 250) + 50;

       /* Guarda valor antigo */

       let oldCoins = coins;

       /* Soma prêmio */

        coins += premio;
        updateCoinsColor();

       /* Anima */

       await animateCoins(oldCoins, coins);;

       /* Atualiza tela */

        //document.getElementById("coins")
        //.innerHTML = coins;

        /* Jackpot aleatório */

        if(premio >= 250){

            playSounds("jackpot");

            setMessage(
            `🎉 SUPER GANHO!!! +${premio} moedas`,
            "green"
            );

            navigator.vibrate?.([200,100,200]);

            //document.getElementById("coins")
            //.innerHTML = coins;

            /* CONFETE */

            let duration = 4000;

            let animationEnd =
            Date.now() + duration;

            let defaults = {

                startVelocity: 30,

                spread: 360,

                ticks: 80,

                zIndex: 9999

            };

            function randomInRange(min, max){

                return Math.random()
                * (max - min) + min;

            }

            let interval = setInterval(function(){

                let timeLeft =
                animationEnd - Date.now();

                if(timeLeft <= 0){

                    return clearInterval(interval);

                }

                let particleCount =
                50 * (timeLeft / duration);

                confetti(Object.assign(
                {},
                defaults,
                {

                    particleCount,

                    origin: {

                        x: randomInRange(0.1, 0.3),

                        y: Math.random() - 0.2

                    }

                }));

                confetti(Object.assign(
                {},
                defaults,
                {

                    particleCount,

                    origin: {

                        x: randomInRange(0.7, 0.9),

                        y: Math.random() - 0.2

                    }

                }));

            },250);

        }

        /* Vitória comum */

        else{

            playSounds("win");

            setMessage(
            `✅ VOCÊ GANHOU +${premio} MOEDAS`,
            "green"
            );

        }

    }

    /* ================================= */
    /* PERDEU */
    /* ================================= */

    else{

        //r1.innerHTML = "🍒";
        //r2.innerHTML = "🍒";
        //r3.innerHTML = "🧴";

        /* Valor aleatório */

        let perda =
        Math.floor(Math.random() * 300) + 50;

        /* Remove moedas */

        coins -= perda;
        updateCoinsColor();

        /* Atualiza tela */

        document.getElementById("coins")
        .innerHTML = coins;

        playSounds("lose");
        /* FLASH VERMELHO */

        const container =
        document.querySelector(".container");

        container.classList.add("flashLose");

        /* Remove efeito */

        setTimeout(()=>{

        container.classList.remove("flashLose");

        },500);

        setMessage(
        `😨 VOCÊ PERDEU ${perda} MOEDAS`,
        "red"
        );

    }

    /* ================================= */
    /* REMOVE TEXTO INICIAL */
    /* ================================= */

    if(rodada >= 2){

        document.querySelector(".subtitle")
        .style.display = "none";

    }

/* ================================= */
/* VERIFICA DÍVIDA */
/* ================================= */

if(coins < 0){

    playSounds("lose");

   // setMessage(
   // `💸 VOCÊ ESTÁ DEVENDO À CASA!<br><br>
   // 📱 Leia o QR Code e tente novamente.`,
   // "red"
   // );

    navigator.vibrate?.([300,100,300]);

    document.body.classList
    .add("redFlash");

    /* DESATIVA BOTÃO */

    document.getElementById("playBtn")
    .disabled = true;

    /* ENCERRA JOGO */

    setTimeout(()=>{

        document.getElementById("gameScreen")
        .innerHTML = `
        <div class="debt-screen">

        <img
        src="divida.png"
        class="debt-image">

        <button
        class="retry-btn"
        onclick="location.reload()">

            JOGAR NOVAMENTE

        </button>

    </div>

    `;

    },3000);

    return;

}

/* ================================= */
/* SEXTA RODADA */
/* ================================= */

if(rodada >= 6){

    /* Se ainda estiver positivo */

    //if(coins > 0){

        r1.innerHTML = "💰";
        r2.innerHTML = "🎱";
        r3.innerHTML = "💀";

        playSounds("gameover");

        setMessage(
        `💸 A CASA SEMPRE GANHA...`,
        "red"
        );

        /* Zera saldo */

        coins = 0;

        document.getElementById("coins")
        .innerHTML = coins;

        navigator.vibrate?.([300,100,300]);

        document.body.classList
        .add("redFlash");

        /* MOSTRA IMAGEM FINAL */

        setTimeout(()=>{

            document.getElementById("gameScreen")
            .style.display="none";

            document.getElementById("warningScreen")
            .style.display="flex";

        },3000);

    //}

    return;

}

    /* ================================= */
    /* LIBERA BOTÃO */
    /* ================================= */

    document.getElementById("playBtn")
    .disabled = false;

}

/* ===================================== */
/* CONTAGEM ANIMADA */
/* ===================================== */

function animateCoins(startValue, finalValue){

    let current = startValue;

    const coinsElement =
    document.getElementById("coins");

    /* SOM */

    const countSound =
    document.getElementById("countSound");

    /* Reinicia som */

    countSound.pause();

    countSound.currentTime = 0;

    /* Volume baixo */

    countSound.volume = 0.3;

    /* Toca uma vez */

    countSound.play().catch(()=>{});

    /* VELOCIDADE */

    let speed = 15;

    /* Se jackpot */

    if(finalValue - startValue > 200){

        speed = 5;

    }

    let counter =
    setInterval(()=>{

        /* Soma */

        current++;

        /* Atualiza */

        coinsElement.innerHTML = current;

        /* Finaliza */

        if(current >= finalValue){

            clearInterval(counter);

            /* Para som */

            countSound.pause();

            countSound.currentTime = 0;

        }

    },speed);

}

/* ===================================== */
/* COR DAS MOEDAS */
/* ===================================== */

function updateCoinsColor(){

    const coinsElement =
    document.getElementById("coins");

    if(coins < 0){

        coinsElement.classList
        .add("negative");

    }

    else{

        coinsElement.classList
        .remove("negative");

    }

}
/* import {

    registrarAcesso,
    registrarPartida,
    registrarGanho,
    registrarDerrota,
    registrarJackpot,
    registrarGameOver,
    registrarTelaFinal,
    registrarJogarNovamente,
    registrarSextaRodada

} from "./firebase.js";

registrarAcesso()
    .then(() => {
        console.log("Firebase conectado com sucesso!");
    })
    .catch((erro) => {
        console.error("Erro Firebase:", erro);
    });
*/ 

/* ===================================== */
/* VARIÁVEIS GLOBAIS */
/* ===================================== */

/* Música ambiente */

const bgMusic =
document.getElementById("bgMusic");

/* Volume baixo */
bgMusic.volume = 0.30;

/* Quantidade de moedas */
let coins = 100;

/* Número da rodada */
let rodada = 0;

/* Emojis normais */
const emojis = [
    "🎱","🦊","🧴","💊","🍒","💎","💰","🍀","🎰"];
/* Emojis de jackpot */
const jackpotEmojis = [
    "👑","💎","🔥","⭐","🐯","💵"];

/* ===================================== */
/* RETORNA EMOJI ALEATÓRIO */
/* ===================================== */
function emoji(){
    return emojis[Math.floor(Math.random()*emojis.length)];
}
function jackpotEmoji(){
    return jackpotEmojis[Math.floor(Math.random() * jackpotEmojis.length)];
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
        audio.volume = 0.5;
    }
    if(type=="spin"){
        audio = document.getElementById("spinSound");
        audio.volume = 0.5;
    }
    if(type=="win"){
        audio = document.getElementById("winSound");
        audio.volume = 0.8;
    }
    if(type=="lose"){
        audio = document.getElementById("loseSound");
        audio.volume = 0.7;
    }
    if(type=="jackpot"){
        audio = document.getElementById("jackpotSound");
        audio.volume = 1;
    }
    if(type=="gameover"){
        audio = document.getElementById("gameOverSound");   
        audio.volume = 1;
    }

    /* Executa áudio */

    if(audio){

    /* NÃO reinicia música ambiente */

    if(type != "bg"){

        audio.pause();

        audio.currentTime = 0;

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

async function play(){

    //await registrarPartida();

    /*Limpa Mensagem*/
    document.getElementById("message").innerHTML = "";

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
/* RESULTADO FINAL PROFISSIONAL */
/* ===================================== */

async function result(){

    const r1 = document.getElementById("r1");
    const r2 = document.getElementById("r2");
    const r3 = document.getElementById("r3");

    /* ================================= */
    /* RODADA FINAL */
    /* ================================= */

    if(rodada >= 6){

       // registrarSextaRodada();

        r1.innerHTML = "💀";
        r2.innerHTML = "💀";
        r3.innerHTML = "💀";

        /* PARA ÁUDIOS */

        document.querySelectorAll("audio")
        .forEach(audio=>{

            audio.pause();
            audio.currentTime = 0;

        });

        /* GAME OVER */
        playSounds("gameover");

        setMessage("💸 A CASA SEMPRE GANHA...",
        "red"
        );

        /* ZERA MOEDAS */
        let oldCoins = coins;
        coins = 0;

        await animateCoins(oldCoins, coins);
        updateCoinsColor();

        navigator.vibrate?.([300,100,300]);

        document.body.classList
        .add("redFlash");

        document.getElementById("playBtn")
        .disabled = true;

        /* MOSTRA IMAGEM FINAL */
        setTimeout(()=>{

            document.getElementById("gameScreen")
            .style.display = "none";
            document.getElementById("warningScreen")
            .style.display = "flex";
            //registrarTelaFinal();

        },3500);

        return;

    }

    /* ================================= */
    /* DEFINE RESULTADO */
    /* ================================= */

    let chance = Math.random();

    let resultado;

    if(chance < 0.10){
        resultado = "jackpot";
    }

    else if(chance < 0.35){
        resultado = "win";
    }

    else if(chance < 0.65){
        resultado = "almost";
    }

    else{
        resultado = "lose";
    }

    /* Emojis */
    let e1;
    let e2;
    let e3;

    /* ================================= */
    /* JACKPOT */
    /* ================================= */

    if(resultado == "jackpot"){
        let special = jackpotEmoji();

        e1 = special;
        e2 = special;
        e3 = special;

    }

    /* ================================= */
    /* GANHO NORMAL */
    /* ================================= */

    else if(resultado == "win"){

        e1 = "🍀";
        e2 = "🍀";
        e3 = "🍀";

    }

    /* ================================= */
    /* QUASE GANHOU */
    /* ================================= */

    else if(resultado == "almost"){

        e1 = "🍀";
        e2 = "🍀";
        e3 = emoji();

        while(
        e3 == "🍀" ||
        jackpotEmojis.includes(e3)
        ){

            e3 = emoji();

        }

    }

    /* ================================= */
    /* DERROTA */
    /* ================================= */

    else{

        e1 = emoji();
        e2 = emoji();
        e3 = emoji();

    }

    /* MOSTRA SLOTS */

    r1.innerHTML = e1;
    r2.innerHTML = e2;
    r3.innerHTML = e3;

    /* ================================= */
    /* JACKPOT */
    /* ================================= */

    if(resultado == "jackpot"){

        let premio =
        Math.floor(Math.random() * 500) + 300;

        let oldCoins = coins;

        coins += premio;
        //registrarJackpot();
        playSounds("jackpot");
        setMessage(
        `🎉 SUPER GANHO!!! +${premio}`,
        "green"
        );

        await animateCoins(oldCoins, coins);

        updateCoinsColor();     

        navigator.vibrate?.([200,100,200]);

        /* CONFETE */

        confetti({
            particleCount:200,
            spread:180
        });

    }

    /* ================================= */
    /* GANHO NORMAL */
    /* ================================= */

    else if(resultado == "win"){

        let premio =
        Math.floor(Math.random() * 150) + 50;

        let oldCoins = coins;

        coins += premio;
        //registrarGanho();
        playSounds("win");
        setMessage(
        `✅ VOCÊ GANHOU +${premio} MOEDAS`,
        "green"
        );

        await animateCoins(oldCoins, coins);

        updateCoinsColor();      

    }

    /* ================================= */
    /* QUASE GANHOU */
    /* ================================= */

    else if(resultado == "almost"){

        let perda =
        Math.floor(Math.random() * 100) + 30;

        let oldCoins = coins;

        coins -= perda;
       // registrarDerrota();
        playSounds("lose");
        setMessage(
        `😨 QUASE! VOCÊ PERDEU ${perda} MOEDAS`,
        "yellow"
        );

        await animateCoins(oldCoins, coins);

        updateCoinsColor();              

    }

    /* ================================= */
    /* DERROTA */
    /* ================================= */

    else{

        let perda =
        Math.floor(Math.random() * 300) + 50;

        let oldCoins = coins;

        coins -= perda;
       // registrarDerrota();
        updateCoinsColor(); 
        playSounds("lose");
         setMessage(
        `😨 VOCÊ PERDEU ${perda} MOEDAS`,
        "red"
        );           

        /* FLASH */
            const container =
            document.querySelector(".container");

            /* Reinicia animação */
            container.classList.remove("flashLose");
            void container.offsetWidth;

            /* Adiciona novamente */
            container.classList.add("flashLose");

            /* Remove classe */
            setTimeout(()=>{
                container.classList.remove("flashLose");
            },2000);

            await animateCoins(oldCoins, coins);

    }

    /* ================================= */
    /* DÍVIDA */
    /* ================================= */

    if(coins < 0){

        //registrarGameOver();
        playSounds("gameover");

        navigator.vibrate?.([300,100,300]);

        document.body.classList.add("redFlash");

        document.getElementById("playBtn").disabled = true;

       setTimeout(()=>{

        // Esconde o jogo
        document.getElementById("gameScreen").style.display = "none";

        // Mostra a tela de dívida
        document.getElementById("debtScreen").style.display = "flex";

    },1500);

    return;

}

    /* ================================= */
    /* LIBERA BOTÃO */
    /* ================================= */

    document.getElementById("playBtn")
    .disabled = false;

}

    /* ===================================== */
    /* ANIMAÇÃO PROFISSIONAL DAS MOEDAS */
    /* ===================================== */

    function animateCoins(startValue, finalValue){

        return new Promise((resolve)=>{

            const coinsElement =
            document.getElementById("coins");

            const countSound =
            document.getElementById("coinLoop");

            /* Reinicia som */

            countSound.pause();

            countSound.currentTime = 0;

            countSound.volume = 0.3;

            countSound.play().catch(()=>{});

            /* Valor atual */

            let current = startValue;

            /* Define direção */

            let increment;

            if(finalValue > startValue){

                increment = 1;

            }

            else{

                increment = -1;

            }

            /* Velocidade */

            let speed = 10;

            if(
            Math.abs(finalValue - startValue)
            > 300
            ){

                speed = 5;

            }

            /* Contagem */

            let counter =
            setInterval(()=>{

                current += increment;

                coinsElement.innerHTML = current;

                /* Finaliza */

                if(current == finalValue){

                    clearInterval(counter);

                    countSound.pause();

                    countSound.currentTime = 0;

                    resolve();

                }

            },speed);

        });

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

        /* ===================================== */
        /* REINICIAR JOGO */
        /* ===================================== */

        async function restartGame(){

       // await registrarJogarNovamente();

        location.reload();

     }

window.play = play;
window.restartGame = restartGame;

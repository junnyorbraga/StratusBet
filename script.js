function result(){

    const r1 = document.getElementById("r1");
    const r2 = document.getElementById("r2");
    const r3 = document.getElementById("r3");

    /* ================================= */
    /* DEFINE SE GANHA OU PERDE */
    /* ================================= */

    let ganhou =
    Math.random() < 0.5;

    /* ================================= */
    /* GANHOU */
    /* ================================= */

    if(ganhou){

        r1.innerHTML = "🍕";
        r2.innerHTML = "🍕";
        r3.innerHTML = "🍕";

        /* Valor aleatório */

        let premio =
        Math.floor(Math.random() * 250) + 50;

        /* Soma moedas */

        coins += premio;

        /* Atualiza tela */

        document.getElementById("coins")
        .innerHTML = coins;

        /* Jackpot aleatório */

        if(premio >= 220){

            playSounds("jackpot");

            setMessage(
            `🎉 JACKPOT! +${premio} moedas`,
            "green"
            );

            navigator.vibrate?.([200,100,200]);

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
            `✅ Você ganhou +${premio} moedas`,
            "green"
            );

        }

    }

    /* ================================= */
    /* PERDEU */
    /* ================================= */

    else{

        r1.innerHTML = "🍕";
        r2.innerHTML = "🍕";
        r3.innerHTML = "💀";

        /* Valor aleatório */

        let perda =
        Math.floor(Math.random() * 300) + 50;

        /* Remove moedas */

        coins -= perda;

        /* Atualiza tela */

        document.getElementById("coins")
        .innerHTML = coins;

        playSounds("lose");

        setMessage(
        `😨 Você perdeu ${perda} moedas`,
        "yellow"
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

        setMessage(
        `💸 VOCÊ ESTÁ DEVENDO A CASA!`,
        "red"
        );

        navigator.vibrate?.([300,100,300]);

        document.body.classList
        .add("redFlash");

        setTimeout(()=>{

            document.getElementById("gameScreen")
            .style.display="none";

            document.getElementById("warningScreen")
            .style.display="flex";

        },3000);

    }

    /* ================================= */
    /* LIMITE DE RODADAS */
    /* ================================= */

    /* ================================= */
/* ÚLTIMA RODADA */
/* ================================= */

if(rodada >= 6){

    /* Se ainda tiver saldo */

    if(coins > 0){

        /* Mostra derrota total */

        r1.innerHTML = "💀";
        r2.innerHTML = "💀";
        r3.innerHTML = "💀";

        playSounds("lose");

        setMessage(
        `💸 A CASA SEMPRE GANHA...`,
        "red"
        );

        /* Zera saldo */

        coins = 0;

        document.getElementById("coins")
        .innerHTML = coins;

        /* Vibração */

        navigator.vibrate?.([300,100,300]);

        /* Fundo vermelho */

        document.body.classList
        .add("redFlash");

    }

    /* Vai para tela final */

    setTimeout(()=>{

        document.getElementById("gameScreen")
        .style.display="none";

        document.getElementById("warningScreen")
        .style.display="flex";

    },3000);

}

    /* ================================= */
    /* LIBERA BOTÃO */
    /* ================================= */

    document.getElementById("playBtn")
    .disabled = false;

}
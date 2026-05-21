let coins = 100;

let rodada = 0;

const emojis = [
"7️⃣",
"💎",
"💰",
"🍀",
"🎰"
];

function emoji(){

    return emojis[
    Math.floor(Math.random()*emojis.length)
    ];

}

function setMessage(text,classe){

    document.getElementById("message").innerHTML =
    `<span class="${classe}">${text}</span>`;

}

function playSounds(type){

    let audio;

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

    if(audio){

        audio.pause();

        audio.currentTime = 0;

        audio.play().catch(e=>{

            console.log("Som bloqueado");

        });

    }

}

function spinAnimation(){

    playSounds("spin");

    const r1 = document.getElementById("r1");
    const r2 = document.getElementById("r2");
    const r3 = document.getElementById("r3");

    r1.classList.add("spin");
    r2.classList.add("spin");
    r3.classList.add("spin");

    let interval = setInterval(()=>{

        r1.innerHTML = emoji();
        r2.innerHTML = emoji();
        r3.innerHTML = emoji();

    },100);

    setTimeout(()=>{

        clearInterval(interval);

        r1.classList.remove("spin");
        r2.classList.remove("spin");
        r3.classList.remove("spin");

        result();

    },1500);

}

function play(){

    document.getElementById("playBtn").disabled = true;

    rodada++;

    spinAnimation();

}

function result(){

    const r1 = document.getElementById("r1");
    const r2 = document.getElementById("r2");
    const r3 = document.getElementById("r3");

    if(rodada <= 3){

        r1.innerHTML = "7️⃣";
        r2.innerHTML = "7️⃣";
        r3.innerHTML = "7️⃣";

        let premio = [50,120,300][rodada-1];

        coins += premio;

        document.getElementById("coins").innerHTML = coins;

        if(rodada == 3){

            playSounds("jackpot");

            setMessage(
            `🎉 JACKPOT! +${premio} moedas`,
            "green"
            );

            navigator.vibrate?.([200,100,200]);

        }

        else{

            playSounds("win");

            setMessage(
            `✅ Você ganhou +${premio} moedas`,
            "green"
            );

        }

    }

    else if(rodada == 4){

        r1.innerHTML = "7️⃣";
        r2.innerHTML = "7️⃣";
        r3.innerHTML = "💀";

        coins -= 200;

        document.getElementById("coins").innerHTML = coins;

        playSounds("lose");

        setMessage(
        `😨 Quase... você perdeu 200 moedas`,
        "yellow"
        );

    }

    else{

        r1.innerHTML = "💀";
        r2.innerHTML = "💀";
        r3.innerHTML = "💀";

        coins = 0;

        document.getElementById("coins").innerHTML = coins;

        playSounds("lose");

        setMessage(
        `❌ VOCÊ PERDEU TUDO`,
        "red"
        );

        navigator.vibrate?.([300,100,300]);

        document.body.classList.add("redFlash");

        setTimeout(()=>{

            document.getElementById("gameScreen").style.display="none";

            document.getElementById("warningScreen").style.display="flex";

        },2500);

    }

    document.getElementById("playBtn").disabled = false;

}
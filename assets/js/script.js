let playerBox = document.querySelector(".player .box-option");
let computerBox = document.querySelector(".computer .box-option");
let msgWarningEl = document.querySelector(".msg-warning");
let msgResultEl = document.querySelector(".msg-result");

let posSpriteRock = "-2px";
let posSpriteScissors = "105px";
let posSpritePapel = "218px";

let msgDraw = "EMPATE!!!";
let msgWon = "GANHOU!!!";
let msgLost = "PERDEU!!!";

window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = 'pt-Br';
recognition.start();

recognition.addEventListener('result', (e) => {
    let result = e.results[0][0].transcript;
    option = result.toLowerCase().replace(".", "").replace("?", "");

    switch (option) {
        case "pedra":
            switchImage(playerBox, posSpriteRock);
            validMove(option);
            break;
        case "papel":
            switchImage(playerBox, posSpritePapel);
            validMove(option);
            break;
        case "tesoura":
            switchImage(playerBox, posSpriteScissors);
            validMove(option);
            break;
        default:
            invalidMove();
    }
});

recognition.addEventListener('end', () => recognition.start());

function validMove(movePlayer) {
    msgWarningEl.classList.add("v-hidden");
    let moveComputer = randomComputerMove();
    checkWinner(movePlayer, moveComputer);
}

function checkWinner(movePlayer, moveComputer){
    msgResultEl.classList.remove("msg-result-won");
    msgResultEl.classList.remove("msg-result-lost");
    if (movePlayer == moveComputer) {
        msgResultEl.innerText = msgDraw;        
    } else {
        if (
            movePlayer == "pedra" && moveComputer == "papel" ||
            movePlayer == "papel" && moveComputer == "tesoura" ||
            movePlayer == "tesoura" && moveComputer == "pedra"
        ) {
            msgResultEl.innerText = msgLost;
            msgResultEl.classList.add("msg-result-lost");
        } else if (
            movePlayer == "pedra" && moveComputer == "tesoura" ||
            movePlayer == "papel" && moveComputer == "pedra" ||
            movePlayer == "tesoura" && moveComputer == "papel"
        ) {
            msgResultEl.innerText = msgWon;
            msgResultEl.classList.add("msg-result-won");
        }
    }

    msgResultEl.classList.remove("v-hidden");
}

function invalidMove() {
    msgWarningEl.classList.remove("v-hidden");
    msgResultEl.classList.add("v-hidden");
    playerBox.innerText = "?";
    computerBox.innerText = "?";
    playerBox.removeAttribute("style");
    computerBox.removeAttribute("style");
}

function randomNumber() {
    let min = 1;
    let max = 3;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomComputerMove() {
    let random = randomNumber();

    if(random == 1){
        switchImage(computerBox, posSpriteRock);
        return "pedra";
    }else if(random == 2){
        switchImage(computerBox, posSpritePapel);
        return "papel";
    }else{
        switchImage(computerBox, posSpriteScissors);
        return "tesoura";
    }
}

function switchImage(boxEl, posSprite) {
    boxEl.innerText = "";
    boxEl.style.backgroundImage = "url('assets/img/spritesheet.png')";
    boxEl.style.backgroundPosition = posSprite;
}
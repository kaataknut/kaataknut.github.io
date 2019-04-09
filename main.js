// Constants
const ENTER_KEY_CODE = 13;

// UI controls
const setupContainer = document.querySelector("div.setup");
const playContainer = document.querySelector("div.playmode");
const displayWordContainer = document.querySelector("div#display");

const inputHangmanWord = document.querySelector("#hangman-word");
const btnPlayWord = document.querySelector("#btn-play-word");
const btnToggleInputType = document.querySelector("#btn-toggle-input-type");


const inputGuess = document.querySelector("#input-guess");
const btnLetterGuess = document.querySelector("#btn-guess-letter");
const btnWordGuess = document.querySelector("#btn-guess-word");

// Game
const hangman = new Hangman();
playword("Dette er en lang setning ");

btnToggleInputType.addEventListener("click", (e) => {
    let newType = inputHangmanWord.type === "text" ? "password" : "text";
    inputHangmanWord.type = newType;
    e.target.innerText = newType === "password" ? "show" : "hide";
});

inputHangmanWord.addEventListener("keydown", (e) => {
    if(e.keyCode === ENTER_KEY_CODE) playword();
});

btnPlayWord.addEventListener("click", playword);

function playword(word) {
    hangman.play(word);

    setupContainer.style.display = "none";
    playContainer.style.display = "block";

    displayWord(hangman.currentWord());
}

function displayWord(word) {
    let fragment = document.createDocumentFragment();

    word.split("").forEach((chr) => {
        let span = document.createElement("span");
        span.classList.add("character");
        span.innerText = chr;
        fragment.append(span);
    });

    displayWordContainer.innerHTML = "";
    displayWordContainer.append(fragment);
}

inputGuess.addEventListener("keydown", (e) => {
    if(e.keyCode === ENTER_KEY_CODE) {
        let val = inputGuess.value;
        if(val.length === 1) btnLetterGuess.click();
        else btnWordGuess.click();
    }
});

btnLetterGuess.addEventListener("click", (e) => {
    let letter = inputGuess.value,
        message;

    if(letter.length === 0) message = "Type 1 letter";
    else if(letter.length >= 2) message = "Maximum 1 letter at a time";

    if(message) return alert(message);
    

    let result = hangman.guessLetter(letter);
    displayWord(result.currentWord);

    if(result.hit) {
        console.log("It is a hit!");
    } else {
        console.log("Ohhh.. miss");
    }

    inputGuess.focus();
});

btnWordGuess.addEventListener("click", (e) => {
    let word = inputGuess.value,
        message;

    if(word.length !== hangman.currentWord().length) 
        message = "Guess word must have equally many letters as hangman word";
    
    if(message) return alert(message);

    let result = hangman.guessWord(word);
    displayWord(result.currentWord);

    if(result.correct) {
        console.log("Correct!");
    } else {
        console.log("Ohhh.. miss");
    }

    inputGuess.focus();
});
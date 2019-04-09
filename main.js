// Constants
const ENTER_KEY_CODE = 13;

// UI controls
const setupContainer = document.querySelector("div.setup");
const playContainer = document.querySelector("div.playmode");
const resultsContainter = document.querySelector("div.results");
const displayWordContainer = document.querySelector("div#display");

const inputHangmanWord = document.querySelector("#hangman-word");
const btnPlayWord = document.querySelector("#btn-play-word");
const btnToggleInputType = document.querySelector("#btn-toggle-input-type");


const inputGuess = document.querySelector("#input-guess");
const btnLetterGuess = document.querySelector("#btn-guess-letter");
const btnWordGuess = document.querySelector("#btn-guess-word");

const btnGiveUp = document.querySelector("#btn-give-up");
const btnPlayAgain = document.querySelector("#btn-play-again");

// Game
const hangman = new Hangman();

btnToggleInputType.addEventListener("click", (e) => {
    let newType = inputHangmanWord.type === "text" ? "password" : "text";
    inputHangmanWord.type = newType;
    e.target.innerText = newType === "password" ? "show" : "hide";
});

inputHangmanWord.addEventListener("keydown", (e) => {
    if(e.keyCode === ENTER_KEY_CODE) playword();
});

btnPlayWord.addEventListener("click", playword);

function playword() {
    let word = inputHangmanWord.value;

    if(word.length === 0) {
        alert("Must have at least one character");
        inputHangmanWord.focus();
        return;
    }

    hangman.play(word);

    setupContainer.style.display = "none";
    playContainer.style.display = "block";

    displayWord(hangman.currentWord());

    inputGuess.focus();
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

function displayResults() {
    let {misses, wordGuesses, hits, hiddenWord} = hangman.results(),
        count = misses.length + wordGuesses.length,
        list = misses.join(", ") + (misses.length > 0 && wordGuesses.length > 0 ? " + " : "") + wordGuesses.join(", ");
        message = count + (count > 0 ? " (" + list + ")" : "");

    resultsContainter.querySelector("#correct-word").innerText = hiddenWord;
    resultsContainter.querySelector("#miss-count").innerText = message;

    playContainer.style.display = "none";
    resultsContainter.style.display = "block";
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

    inputGuess.value = "";

    if(result.gameSolved) displayResults();
    else inputGuess.focus();
});

btnWordGuess.addEventListener("click", (e) => {
    let word = inputGuess.value,
        message;

    if(word.length !== hangman.currentWord().length) 
        message = "Guess word must have equally many letters as hangman word";
    
    if(message) return alert(message);

    let result = hangman.guessWord(word);
    displayWord(result.currentWord);

    inputGuess.value = "";

    if(result.gameSolved) displayResults();
    else inputGuess.focus();
});

btnGiveUp.addEventListener("click", displayResults);

btnPlayAgain.addEventListener("click", (e) => {
    inputHangmanWord.value = "";

    resultsContainter.style.display = "none";
    setupContainer.style.display = "block";

    inputHangmanWord.focus();
});



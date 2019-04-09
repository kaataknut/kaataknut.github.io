function Hangman(options) {
    let hiddenWord,
        hits = [],
        misses = [],
        wordGuesses = [],
        currentWord;

    
    this.play = function(word) {
        hits = [];
        misses = [];
        wordGuesses = [];
        hiddenWord = word.toLowerCase();
        currentWord = hiddenWord.replace(/\w/g, "_");
    }

    this.guessWord = function(word) {
        let gameSolved = isCorrect(word);
        
        if(gameSolved) currentWord = hiddenWord;
        else wordGuesses.push(word);

        return {gameSolved, currentWord};
    }

    this.guessLetter = function(character) {
        character = character.toLowerCase();

        if(hits.includes(character) || misses.includes(character)) {
            return {
                hit: false,
                message: "already guessed",
                currentWord
            };
        }

        let hit = hiddenWord.includes(character);

        if(hit) hits.push(character);
        else misses.push(character);
        
        buildCurrent();
        
        return {
            hit,
            message: hit ? "hit" : "miss",
            currentWord,
            gameSolved: isCorrect(currentWord)
        };
    }

    this.currentWord = function() {
        return currentWord;
    }

    this.results = function() {
        return { misses, wordGuesses, hits, hiddenWord };
    }

    function isCorrect(word) {
        return hiddenWord === word.toLowerCase();
    }

    function buildCurrent() {
        let str = "";
        for(let i = 0; i < hiddenWord.length; i++) {
            let char = hiddenWord.charAt(i);

            if(hits.includes(char) || char === " ") str += char;
            else str += "_";
        }

        currentWord = str;
    }
}
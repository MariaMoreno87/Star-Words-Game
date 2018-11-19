var word;
var allowedGuesses;
var correctGuesses;
var wrongGuesses;
var wins = 0;
var loses = 0;
var rounds = 0;
var playerName = "";
var totalCorrectWordsGuessed;
var characterAudio;
var charactersArray = [{ "name": "Chewbacca", "image": "", "sound": "./assets/sound/Chewbacca.mp3" },
{ "name": "Jedi", "image": "", "sound": "./assets/sound/Jedi.mp3" },
{ "name": "Sith", "image": "", "sound": "./assets/sound/Sith.mp3" },
{ "name": "Vader", "image": "", "sound": "./assets/sound/VaderBreath.mp3" },
{ "name": "BB8", "image": "", "sound": "./assets/sound/BB8.mp3" },
{ "name": "C3PO", "image": "", "sound": "./assets/sound/C3PO.mp3" },
{ "name": "R2D2", "image": "", "sound": "./assets/sound/R2D2.mp3" },
{ "name": "Droid", "image": "", "sound": "./assets/sound/Droid.mp3" }]

//Get DOM elements 
var wordElement = document.getElementById('word');
var letterCountElement = document.getElementById('guesses');
var lettersGuessedElement = document.getElementById('lettersGuessed');
var winsCountElement = document.getElementById('winsCount');
var losesCountElement = document.getElementById('losesCount');
var msgBoardElement = document.getElementById('msgBoard');
var msgElement = document.getElementById('msg');
var myAudioElement = document.getElementById('myaudio');
var audioSourceElement = document.getElementById('audioSource');
var AudioContext = window.AudioContext || window.webkitAudioContext;

function initializeGame() {
    if (rounds == 0) {
        //Reset and prompt for new player
        var initialRound = "0";
        winsCountElement.innerHTML = initialRound;
        losesCountElement.innerHTML = initialRound;
        totalCorrectWordsGuessed = [];
        playerName = prompt("Please enter your name", "Anonymous");
        msgBoardElement.innerHTML = "May the force be with you, " + playerName + "!";
    }
    lettersGuessedElement.innerHTML = "";
    word = chooseRandomCharacter(); //Get a new character that has not already been guessed correctly.
    characterAudio = getAudioSource(word);
    allowedGuesses = word.length + 3;
    wrongGuesses = [];
    correctGuesses = [];
    console.log(word);

    // initialize correctGuesses array with underscores
    for (var i = 0; i < word.length; i++) {
        correctGuesses.push('_');
    }

    wordElement.innerHTML = correctGuesses.join(' ');//Joins _ with a space between them
    letterCountElement.innerHTML = allowedGuesses;
}

function updateGuesses(letter) {
    var audioCtx = new AudioContext();
    if (!alreadyGuessed(letter)) {//Does nothing if player has already used that letter
        allowedGuesses--; // decrement guesses left
        letterCountElement.innerHTML = allowedGuesses;
        var formattedWord = word.toLowerCase();

        if (formattedWord.indexOf(letter.toLowerCase()) === -1 && letter) { // letter is NOT in the word
            wrongGuesses.push(letter); // update letters guessed
            lettersGuessedElement.innerHTML = wrongGuesses.join(', ');
        } else { // letter IS in the word
            // replace underscore with the letter
            for (var i = 0; i < word.length; i++) {
                if (word[i] === letter.toLowerCase()) {
                    correctGuesses[i] = letter;
                }
                if (word[i] === letter.toUpperCase()) {
                    correctGuesses[i] = letter.toUpperCase();
                }
            }

            wordElement.innerHTML = correctGuesses.join(' ');//Add correct letter to html
        }
    }
    addToMsg("Tried already that letter you have: " + letter);
}

//Check if player has won
function didIWin() {
    if (correctGuesses.indexOf('_') === -1) {//Check if there are any _ left to guess at
        wins++;
        rounds++;
        winsCountElement.innerHTML = wins;
        addAudioSource(characterAudio);
        myAudioElement.play();
        addToMsg("Strong the force is within you, " + playerName + ". Guessed correctly, you did: " + word + "!");
        if (!isJediMaster()) {
            initializeGame();
        }
    } else if (allowedGuesses === 0) {
        loses++;
        rounds++;
        losesCountElement.innerHTML = loses;
        addToMsg("With you, the force was not, " + playerName + ". The correct word was: " + word + "!");
        initializeGame();
    }
}

function addToMsg(msg) {
    msgElement.innerHTML = msg;
}

function alreadyGuessed(guessedLetter) {
    if (wrongGuesses.indexOf(guessedLetter.toLowerCase()) > -1 || correctGuesses.indexOf(guessedLetter.toLowerCase()) > -1) {
        return true;
    }
    return false;
}

function isJediMaster() {
    totalCorrectWordsGuessed.push(word);
    if (totalCorrectWordsGuessed.length === charactersArray.length) {
        return true;
    }
    return false;
}

function characterGuessedAlready(potentialCharacter) {
    if (totalCorrectWordsGuessed.indexOf(potentialCharacter) > -1) {
        return true;
    }
    return false;
}

function chooseRandomCharacter() {
    var character = randomCharacter();
    while (characterGuessedAlready(character)) {
        character = randomCharacter();
    }
    return character;
}

function randomCharacter() {
    return charactersArray[Math.floor(Math.random() * charactersArray.length)].name;
}

function getAudioSource(currentCharacter) {
    var character = charactersArray.find(character => character.name === currentCharacter);
    return character.sound;
}

function addAudioSource(currentAudioSource) {
    audioSourceElement.src = currentAudioSource;
}

function playAudio(){    
    myAudioElement.play();
}

document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    updateGuesses(letterGuessed);
    didIWin();
};

initializeGame();
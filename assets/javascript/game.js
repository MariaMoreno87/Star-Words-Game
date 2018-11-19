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
var characterImg; 
var audioCtx;
var charactersArray = [{ "name": "Chewbacca", "image": "./assets/images/Chewbacca.jpg", "sound": "chewbaccaaudio" },
{ "name": "Jedi", "image": "./assets/images/Jedi.jpg", "sound": "jediaudio" },
{ "name": "Sith", "image": "./assets/images/Sith.jpg", "sound": "sithaudio" },
{ "name": "Vader", "image": "./assets/images/Vader.jpg", "sound": "vaderaudio" },
{ "name": "BB8", "image": "./assets/images/BB8.jpg", "sound": "bbb8audio" },
{ "name": "C3PO", "image": "./assets/images/C3PO.jpg", "sound": "c3poaudio" },
{ "name": "R2D2", "image": "./assets/images/R2D2.jpeg", "sound": "r2d2audio" },
{ "name": "Droid", "image": "./assets/images/Droid.jpg", "sound": "droidaudio" }]

//Get DOM elements 
var wordElement = document.getElementById('word');
var letterCountElement = document.getElementById('guesses');
var lettersGuessedElement = document.getElementById('lettersGuessed');
var winsCountElement = document.getElementById('winsCount');
var losesCountElement = document.getElementById('losesCount');
var msgBoardElement = document.getElementById('msgBoard');
var msgElement = document.getElementById('msg');
var overlay = document.getElementById("overlay");
var characterImgelement = document.getElementById('characterimg');

function initializeGame() {
    if (rounds == 0) {
        //Reset and prompt for new player        
        var initialRound = "0";
        winsCountElement.innerHTML = initialRound;
        losesCountElement.innerHTML = initialRound;
        overlay.style.display = "block"//Turns on the overlay curtain
        totalCorrectWordsGuessed = [];
        playerName = prompt("Please enter your name", "Anonymous");
        msgBoardElement.innerHTML = "May the force be with you, " + playerName + "!";
    }
    lettersGuessedElement.innerHTML = "";
    word = chooseRandomCharacter(); //Get a new character that has not already been guessed correctly.
    characterAudio = getAudioSource(word);//Get the audio to play for current character
    characterImg = getCharacterImage(word);//Get the image to show for current character
    allowedGuesses = word.length + 3;
    wrongGuesses = [];
    correctGuesses = [];

    // initialize correctGuesses array with underscores
    for (var i = 0; i < word.length; i++) {
        correctGuesses.push('_');
    }

    wordElement.innerHTML = correctGuesses.join(' ');//Joins _ with a space between them
    letterCountElement.innerHTML = allowedGuesses;
}

function updateGuesses(letter) {
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
        showCharacterImg(characterImg);
        playAudio(characterAudio);
        addToMsg("Strong the force is within you, " + playerName + ". Guessed correctly, you did: " + word + "!");
        if (!isJediMaster()) {
            initializeGame();
        } else {//player has won the whole game. Roll the credits!!!
            showCharacterImg("./assets/images/win.gif");
            playAudio("winaudio");
        }

    } else if (allowedGuesses === 0) {//player has lossed the round. select next character
        loses++;
        rounds++;
        showCharacterImg("./assets/images/fail.gif");
        losesCountElement.innerHTML = loses;
        addToMsg("With you, the force was not, " + playerName + ". The correct word was: " + word + "!");
        initializeGame();
    }
}

//adds a message to the msg div
function addToMsg(msg) {
    msgElement.innerHTML = msg;
}

//checks if the letter guessed has been used already
function alreadyGuessed(guessedLetter) {
    if (wrongGuesses.indexOf(guessedLetter.toLowerCase()) > -1 || correctGuesses.indexOf(guessedLetter.toLowerCase()) > -1) {
        return true;
    }
    return false;
}

//checks if player has already guessed all the characters correctly
function isJediMaster() {
    totalCorrectWordsGuessed.push(word);
    if (totalCorrectWordsGuessed.length === charactersArray.length) {
        return true;
    }
    return false;
}

//checks if the character has already been guessed correctly
function characterGuessedAlready(potentialCharacter) {
    if (totalCorrectWordsGuessed.indexOf(potentialCharacter) > -1) {
        return true;
    }
    return false;
}

//selects a random character who has not already been guessed correctly
function chooseRandomCharacter() {
    var character = randomCharacter();
    while (characterGuessedAlready(character)) {
        character = randomCharacter();
    }
    return character;
}

//selects a random character from the charactersArray
function randomCharacter() {
    return charactersArray[Math.floor(Math.random() * charactersArray.length)].name;
}

//get the current character sound to play
function getAudioSource(currentCharacterSound) {
    var character = getCurrentCharacter(currentCharacterSound);
    return character.sound;
}

//get the currenct character image to display
function getCharacterImage(currentCharacterImg) {
    var character = getCurrentCharacter(currentCharacterImg);
    return character.image;
}

//get the selected character objec from the charactersArray
function getCurrentCharacter(currentCharacter) {
    // return charactersArray.find(function(character) {
    //     character.name === currentCharacter;
    // })
    return charactersArray.find(character => character.name === currentCharacter);//used arrow function to cleanup code
}

function playAudio(audioId) {
    var audioElm = getAudioElement(audioId);
    audioElm.play();//play the HTML5 audio
}

function getAudioElement(audioElmId) {
    return document.getElementById(audioElmId);//get the audio needed to play
}

function showCharacterImg(characterImgSrc) {
    characterImgelement.src = characterImgSrc;//set the html image src to my character image
}

function off() {
    overlay.style.display = "none";//turn off the overlay curtain
    if (rounds == 0) playAudio("introaudio");//plays intro song
}

//Checks if character passed in is either a number or letter only
function charValidation(charToValidate) {
    if (charToValidate >= 48 && charToValidate <= 90) {
        return true;//character IS a number or letter
    }
    return false;//character is NOT a number or letter
}

document.onkeyup = function (event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    if (charValidation(event.keyCode)) {//Check if key is a number or letter event.keycode knows the key numbers
        updateGuesses(letterGuessed);
        didIWin();
    }
};

initializeGame();
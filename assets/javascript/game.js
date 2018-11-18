var listOfWords = ["Chewbacca", "Jedi", "Storm Tropper", "Droid", "Rey"];
var listOfWords = listOfWords[Math.floor(Math.random() * listOfWords.length)];

var answerArray= document.getElementById("word");
for (var i=0; i < listOfWords.length; i++){
    words.textContent=answerArray[i]= " _ ";
}
var remainingLetters= listOfWords.length;
// var answerArray = [] ;
// for (var i = 0; i < listOfWords.length; i++) document.activeElementgetElementById("word"); {
//     answerArray[i] = "_";
//    }
//    var remainingLetters = word.length;

// for (var j = 0; j < word.length; j++) {
//     if (word[j] === guess) {
//      answerArray[j] = guess;
//     remainingLetters--;
//      }
//     }